### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| index.js | 10 | Switch from CJS to ESM imports on server-side modules
| app/index.js | 66 | Production build task
| app/index.js | 70 | Add API Routes
| app/passport.js | 7 | Update passport handlers
| app/passport.js | 8 | Store strategy's in strategy folder
| app/client/App.vue | 28 | Extract CSS to avoid FOUT
| app/config/index.js | 29 | Make output a bit more compact and streamlined
| app/client/components/LoginForm.vue | 42 | Add real authentication API
| app/client/components/SiteHeader.vue | 9 | Separate search and nav into separate components
| app/client/components/SiteHeader.vue | 25 | Add link to profile/account page
| app/client/router/index.js | 10 | Add mode: 'history' to remove # from URLs. Need server support. Read here: https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
| app/client/router/index.js | 12 | Add vue-progressbar across the entire app
| app/client/store/index.js | 6 | Separate store into separate modules as data complexity grows.
| app/server/models/user.js | 7 | Add virtuals for attaching user posts, comments, etc.
| app/server/routes/user.js | 1 | Add User API Routes

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| app/index.js | 112 | 500 error after missing favicon request. I think I need a wildcard handler for all non-API routes and the core files (index.html and bundle.js)
| app/server/models/user.js | 6 | dateLastLogin should be updated upon each successful authentication and authenticated request
