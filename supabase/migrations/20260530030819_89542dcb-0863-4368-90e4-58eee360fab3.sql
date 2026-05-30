
-- 1. Restrict invitation SELECT to owners/admins (tokens are sensitive)
DROP POLICY IF EXISTS "Agency members can view invitations" ON public.agency_invitations;
CREATE POLICY "Agency owners and admins can view invitations"
ON public.agency_invitations
FOR SELECT
TO authenticated
USING (get_agency_role(agency_id, auth.uid()) = ANY (ARRAY['owner'::agency_role, 'admin'::agency_role]));

-- 2. Prevent admins from escalating to owner. Split ALL policy into granular ones.
DROP POLICY IF EXISTS "Agency owners and admins can manage members" ON public.agency_members;

-- Admins+owners can insert members, but only owners can create owner-role rows
CREATE POLICY "Owners and admins can add members"
ON public.agency_members
FOR INSERT
TO authenticated
WITH CHECK (
  get_agency_role(agency_id, auth.uid()) = ANY (ARRAY['owner'::agency_role, 'admin'::agency_role])
  AND (role <> 'owner'::agency_role OR get_agency_role(agency_id, auth.uid()) = 'owner'::agency_role)
);

-- Only owners can change roles; admins cannot update memberships
CREATE POLICY "Owners can update members"
ON public.agency_members
FOR UPDATE
TO authenticated
USING (get_agency_role(agency_id, auth.uid()) = 'owner'::agency_role)
WITH CHECK (get_agency_role(agency_id, auth.uid()) = 'owner'::agency_role);

-- Owners and admins can remove members (but DB-level safeguard for last owner should live in app code)
CREATE POLICY "Owners and admins can remove members"
ON public.agency_members
FOR DELETE
TO authenticated
USING (get_agency_role(agency_id, auth.uid()) = ANY (ARRAY['owner'::agency_role, 'admin'::agency_role]));

-- 3. Add explicit DELETE policy for clients (owners/admins only)
CREATE POLICY "Agency owners and admins can delete clients"
ON public.clients
FOR DELETE
TO authenticated
USING (get_agency_role(agency_id, auth.uid()) = ANY (ARRAY['owner'::agency_role, 'admin'::agency_role]));
