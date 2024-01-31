import type { Session, User } from "lucia";

export default defineEventHandler(async (event) => {
  const lucia = useLucia();

  // Check if there is a session cookie.
  const sessionId = getCookie(event, lucia.sessionCookieName);
  if (!sessionId) {
    event.context.session = null;
    event.context.user = null;
    return;
  }

  // Validate said cookie.
  // If it is invalid, remove the cookie.
  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
  }
  if (!session) {
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize()
    );
  }

  // Put the session and user in the event context
  // so we can access it in other event-handlers and middleware.
  event.context.session = session;
  event.context.user = user;
});

// We need to augment the h3 module to get
// `user` and `session` autocomplete in `event.context`.
declare module "h3" {
  interface H3EventContext {
    user: User | null;
    session: Session | null;
  }
}
