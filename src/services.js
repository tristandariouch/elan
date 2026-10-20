import {createClient} from '@supabase/supabase-js';
const env=import.meta.env||{};
export const config={contactEmail:env.VITE_CONTACT_EMAIL||'',supabaseUrl:env.VITE_SUPABASE_URL||'',supabaseKey:env.VITE_SUPABASE_PUBLISHABLE_KEY||''};
export const authReady=!!(config.supabaseUrl&&config.supabaseKey);
let instance=null;
export function authClient(){if(!authReady)return null;if(!instance)instance=createClient(config.supabaseUrl,config.supabaseKey,{auth:{flowType:'pkce',detectSessionInUrl:true,persistSession:true}});return instance;}
export async function signIn(provider){const client=authClient();if(!client)throw new Error('Les connexions seront disponibles après ouverture des inscriptions. Aucun compte n’a été connecté.');if(!['google','apple','linkedin_oidc'].includes(provider))throw new Error('Connexion non prise en charge.');const redirectTo=new URL(window.location.pathname,window.location.origin).href;const {error}=await client.auth.signInWithOAuth({provider,options:{redirectTo}});if(error)throw error;}
export function contactMessage({name,email,topic,message}){return {subject:'Élan — '+topic,body:`Bonjour,\n\n${message.trim()}\n\n${name.trim()}\nAdresse de réponse : ${email.trim()}`};}
export function contactHref(email,draft){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return '';return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;}
