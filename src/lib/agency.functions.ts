import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getUserAgencies = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;
    const { data, error } = await supabaseAdmin
      .from("agency_members")
      .select("role, agencies(id, name, slug, logo_url, primary_color)")
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { agencies: data?.map((m: any) => ({ ...m.agencies, role: m.role })) ?? [] };
  });

export const createAgency = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ name: z.string().min(1).max(100), slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/) }).parse(input)
  )
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { data: agency, error: aErr } = await supabaseAdmin
      .from("agencies")
      .insert({ name: data.name, slug: data.slug })
      .select()
      .single();
    if (aErr) throw new Error(aErr.message);
    const { error: mErr } = await supabaseAdmin
      .from("agency_members")
      .insert({ agency_id: agency.id, user_id: userId, role: "owner" });
    if (mErr) throw new Error(mErr.message);
    return { agency };
  });

export const getPendingInvitations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email")
      .eq("id", userId)
      .single();
    const email = profile?.email;
    if (!email) return { invitations: [] };
    const { data, error } = await supabaseAdmin
      .from("agency_invitations")
      .select("*, agencies(name, slug)")
      .eq("email", email)
      .eq("status", "pending")
      .gt("expires_at", new Date().toISOString());
    if (error) throw new Error(error.message);
    return { invitations: data ?? [] };
  });

export const acceptInvitation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ token: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { data: inv, error: fErr } = await supabaseAdmin
      .from("agency_invitations")
      .select("*")
      .eq("token", data.token)
      .eq("status", "pending")
      .single();
    if (fErr || !inv) throw new Error("Invalid or expired invitation");
    if (new Date(inv.expires_at) < new Date()) throw new Error("Invitation expired");
    const { error: mErr } = await supabaseAdmin
      .from("agency_members")
      .insert({ agency_id: inv.agency_id, user_id: userId, role: inv.role });
    if (mErr) throw new Error(mErr.message);
    const { error: uErr } = await supabaseAdmin
      .from("agency_invitations")
      .update({ status: "accepted", accepted_at: new Date().toISOString() })
      .eq("id", inv.id);
    if (uErr) throw new Error(uErr.message);
    return { success: true };
  });
