# Architecture rules

- Apply website identity and tracking changes to both React sources and every standalone HTML page, including all homepage copies; static pages do not inherit React changes.
- Keep phone links functional without analytics, and leave legacy tracking loaders and conversion handlers absent until a replacement container is supplied; a tracking reset must not interrupt calls.
- Preserve existing photo assets under the current brand filenames without rewriting immutable hosted asset pointers; local image imports and static references must resolve after a rebrand.
- Run `npm test` for the website identity and tracking reset invariants; these rules cover static call destinations and prevent legacy brand or tracking IDs from returning.