-- Enum for agency member roles
CREATE TYPE public.agency_role AS ENUM ('owner', 'admin', 'member');

-- Enum for invitation status
CREATE TYPE public.invitation_status AS ENUM ('pending', 'accepted', 'expired');

-- Agencies table
CREATE TABLE public.agencies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    custom_domain TEXT UNIQUE,
    logo_url TEXT,
    primary_color TEXT,
    plan TEXT DEFAULT 'free' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Agency members (many-to-many users <> agencies)
CREATE TABLE public.agency_members (
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.agency_role NOT NULL DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (agency_id, user_id)
);

-- Agency invitations
CREATE TABLE public.agency_invitations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role public.agency_role NOT NULL DEFAULT 'member',
    token TEXT NOT NULL UNIQUE,
    status public.invitation_status NOT NULL DEFAULT 'pending',
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    accepted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Clients of agencies
CREATE TABLE public.clients (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    contact_email TEXT,
    contact_phone TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (agency_id, slug)
);

-- Client portal users (link auth.users to clients)
CREATE TABLE public.client_users (
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (client_id, user_id)
);

-- Agency domains for white-label (supports multiple domains per agency)
CREATE TABLE public.agency_domains (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    agency_id UUID NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
    domain TEXT NOT NULL UNIQUE,
    verified BOOLEAN NOT NULL DEFAULT false,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- GRANTS
GRANT SELECT, INSERT, UPDATE, DELETE ON public.agencies TO authenticated;
GRANT ALL ON public.agencies TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.agency_members TO authenticated;
GRANT ALL ON public.agency_members TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.agency_invitations TO authenticated;
GRANT ALL ON public.agency_invitations TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.clients TO authenticated;
GRANT ALL ON public.clients TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_users TO authenticated;
GRANT ALL ON public.client_users TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.agency_domains TO authenticated;
GRANT ALL ON public.agency_domains TO service_role;

-- Enable RLS
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_domains ENABLE ROW LEVEL SECURITY;

-- Security helper functions
CREATE OR REPLACE FUNCTION public.is_agency_member(_agency_id UUID, _user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.agency_members
    WHERE agency_id = _agency_id AND user_id = _user_id
  )
$$;

CREATE OR REPLACE FUNCTION public.get_agency_role(_agency_id UUID, _user_id UUID)
RETURNS public.agency_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.agency_members
  WHERE agency_id = _agency_id AND user_id = _user_id
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.is_client_user(_client_id UUID, _user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.client_users
    WHERE client_id = _client_id AND user_id = _user_id
  )
$$;

-- RLS Policies for agencies
CREATE POLICY "Agency members can view their agencies"
ON public.agencies FOR SELECT
TO authenticated
USING (public.is_agency_member(id, auth.uid()));

CREATE POLICY "Agency owners and admins can update their agencies"
ON public.agencies FOR UPDATE
TO authenticated
USING (public.get_agency_role(id, auth.uid()) IN ('owner', 'admin'));

-- RLS Policies for agency_members
CREATE POLICY "Agency members can view members of their agencies"
ON public.agency_members FOR SELECT
TO authenticated
USING (public.is_agency_member(agency_id, auth.uid()));

CREATE POLICY "Agency owners and admins can manage members"
ON public.agency_members FOR ALL
TO authenticated
USING (public.get_agency_role(agency_id, auth.uid()) IN ('owner', 'admin'))
WITH CHECK (public.get_agency_role(agency_id, auth.uid()) IN ('owner', 'admin'));

-- RLS Policies for agency_invitations
CREATE POLICY "Agency members can view invitations"
ON public.agency_invitations FOR SELECT
TO authenticated
USING (public.is_agency_member(agency_id, auth.uid()));

CREATE POLICY "Agency owners and admins can manage invitations"
ON public.agency_invitations FOR ALL
TO authenticated
USING (public.get_agency_role(agency_id, auth.uid()) IN ('owner', 'admin'))
WITH CHECK (public.get_agency_role(agency_id, auth.uid()) IN ('owner', 'admin'));

-- RLS Policies for clients
CREATE POLICY "Agency members can view their clients"
ON public.clients FOR SELECT
TO authenticated
USING (public.is_agency_member(agency_id, auth.uid()));

CREATE POLICY "Agency members can create clients"
ON public.clients FOR INSERT
TO authenticated
WITH CHECK (public.is_agency_member(agency_id, auth.uid()));

CREATE POLICY "Agency owners and admins can update/delete clients"
ON public.clients FOR UPDATE
TO authenticated
USING (public.get_agency_role(agency_id, auth.uid()) IN ('owner', 'admin'));

-- RLS Policies for client_users
CREATE POLICY "Agency members can view client_users"
ON public.client_users FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.clients c
    WHERE c.id = client_id AND public.is_agency_member(c.agency_id, auth.uid())
  )
);

CREATE POLICY "Agency members can manage client_users"
ON public.client_users FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.clients c
    WHERE c.id = client_id AND public.get_agency_role(c.agency_id, auth.uid()) IN ('owner', 'admin')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.clients c
    WHERE c.id = client_id AND public.get_agency_role(c.agency_id, auth.uid()) IN ('owner', 'admin')
  )
);

-- RLS Policies for agency_domains
CREATE POLICY "Agency members can view domains"
ON public.agency_domains FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.agencies a
    WHERE a.id = agency_id AND public.is_agency_member(a.id, auth.uid())
  )
);

CREATE POLICY "Agency owners and admins can manage domains"
ON public.agency_domains FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.agencies a
    WHERE a.id = agency_id AND public.get_agency_role(a.id, auth.uid()) IN ('owner', 'admin')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.agencies a
    WHERE a.id = agency_id AND public.get_agency_role(a.id, auth.uid()) IN ('owner', 'admin')
  )
);

-- Updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_agencies_updated_at
BEFORE UPDATE ON public.agencies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();