# Architecture rules

- Apply website identity and tracking changes to both React sources and every standalone HTML page, including all homepage copies; static pages do not inherit React changes.
- Keep phone links functional without analytics, and leave legacy tracking loaders and conversion handlers absent until a replacement container is supplied; a tracking reset must not interrupt calls.
- Preserve existing photo assets under the current brand filenames without rewriting immutable hosted asset pointers; local image imports and static references must resolve after a rebrand.
- Run `npm test` for the website identity and tracking reset invariants; these rules cover static call destinations and prevent legacy brand or tracking IDs from returning.
- Serve global legal pages as standalone HTML under public with trailing-slash footer destinations, because static home and city pages do not inherit React routes.
- Derive static service pages from the public homepage, preserving its CSS and shared sections and only changing the city script's title assignment, so service templates retain homepage behavior.
- Treat public/static-home.html as the authoritative homepage; synchronize public/index.html before builds and dist/index.html after Vite, since Vite otherwise overwrites the public copy with the root entry.