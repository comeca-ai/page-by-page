-- Revoke EXECUTE on SECURITY DEFINER helper functions from public/anonymous users
REVOKE EXECUTE ON FUNCTION public.is_agency_member(UUID, UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_agency_role(UUID, UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_client_user(UUID, UUID) FROM anon;

-- Revoke EXECUTE on SECURITY DEFINER helper functions from authenticated users
REVOKE EXECUTE ON FUNCTION public.is_agency_member(UUID, UUID) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.get_agency_role(UUID, UUID) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.is_client_user(UUID, UUID) FROM authenticated;