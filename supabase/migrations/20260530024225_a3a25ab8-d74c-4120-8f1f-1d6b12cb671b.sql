-- Revoke default PUBLIC EXECUTE on SECURITY DEFINER helpers
REVOKE ALL ON FUNCTION public.is_agency_member(UUID, UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_agency_role(UUID, UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_client_user(UUID, UUID) FROM PUBLIC;

-- Only service_role can call directly if needed
GRANT EXECUTE ON FUNCTION public.is_agency_member(UUID, UUID) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_agency_role(UUID, UUID) TO service_role;
GRANT EXECUTE ON FUNCTION public.is_client_user(UUID, UUID) TO service_role;