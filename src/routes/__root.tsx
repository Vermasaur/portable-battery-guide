import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Portable Battery Guide" },
      { name: "description", content: "I quick overview of portable batteries I developed as a guide for myself and others who are interested in learning about and purchasing a portable battery setup" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Portable Battery Guide" },
      { property: "og:description", content: "I quick overview of portable batteries I developed as a guide for myself and others who are interested in learning about and purchasing a portable battery setup" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Portable Battery Guide" },
      { name: "twitter:description", content: "I quick overview of portable batteries I developed as a guide for myself and others who are interested in learning about and purchasing a portable battery setup" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b2c81577-7f5c-44e9-8251-3e89296919d7/id-preview-c7d1cf2b--8823ce11-51a0-4634-9600-a53aab8cbd75.lovable.app-1777927288848.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b2c81577-7f5c-44e9-8251-3e89296919d7/id-preview-c7d1cf2b--8823ce11-51a0-4634-9600-a53aab8cbd75.lovable.app-1777927288848.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
