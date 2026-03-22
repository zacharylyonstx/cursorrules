'use strict';

module.exports = {
  name: 'Angular',
  description: 'Angular 17+ with signals, standalone components, and modern patterns',
  rules: `## Angular Architecture

- Use standalone components by default (Angular 14+). NgModules are legacy for new code.
- Use Angular signals for reactive state management (Angular 16+).
- Use the new control flow syntax: @if, @for, @switch (Angular 17+).
- Follow the Angular style guide for naming and file organization.
- Use Angular CLI for generating components, services, pipes, guards.

## Components

- One component per file. Name: feature.component.ts, feature.component.html, feature.component.css.
- Use OnPush change detection strategy for all components: \`changeDetection: ChangeDetectionStrategy.OnPush\`
- Keep component templates small. Extract complex templates into child components.
- Use input() and output() signal-based APIs (Angular 17.1+) over @Input/@Output decorators.
- Use model() for two-way binding (Angular 17.2+).
- Smart (container) components handle data/logic. Dumb (presentational) components only display.
- Prefix component selectors with app or feature name: \`selector: 'app-user-card'\`.

## Signals & State

- Use signal() for component state: \`count = signal(0)\`
- Use computed() for derived state: \`doubled = computed(() => this.count() * 2)\`
- Use effect() for side effects triggered by signal changes.
- Use toSignal() to convert Observables to signals.
- Use toObservable() to convert signals to Observables when needed.
- Signals are synchronous and simpler than RxJS for most UI state.

## Services & Dependency Injection

- Use providedIn: 'root' for singleton services.
- Use inject() function instead of constructor injection (cleaner syntax).
- Services handle business logic, API calls, and state management.
- Use the repository pattern: ApiService handles HTTP, DataService handles business logic.
- Use InjectionToken for non-class dependencies.
- Use functional providers for simpler dependency registration.

## RxJS (When Needed)

- Use signals for synchronous UI state. Use RxJS for async streams (HTTP, WebSockets, events).
- Always unsubscribe: use takeUntilDestroyed(), async pipe, or DestroyRef.
- Prefer higher-order mapping: switchMap (cancel previous), mergeMap (parallel), concatMap (sequential), exhaustMap (ignore during active).
- Use combineLatest, forkJoin, and withLatestFrom for combining streams.
- Avoid nested subscriptions — use operators to compose streams.
- Use shareReplay() for multicast streams that cache the latest value.

## Routing

- Use lazy loading for all feature routes: \`loadComponent: () => import('./feature.component')\`
- Use route guards with functional syntax: \`canActivate: [() => inject(AuthService).isAuthenticated()]\`
- Use route resolvers for pre-loading data before navigation.
- Use the Router service for programmatic navigation.
- Use routerLink directive for template navigation.
- Use child routes for nested layouts.

## Forms

- Use Reactive Forms for complex forms with validation.
- Use typed FormGroup (Angular 14+): \`FormGroup<{ name: FormControl<string> }>\`
- Create reusable validators for common patterns.
- Show validation errors with a reusable error component.
- Use updateOn: 'blur' or 'submit' to reduce validation frequency.
- Implement ControlValueAccessor for custom form controls.

## HTTP

- Use HttpClient with typed responses: \`this.http.get<User[]>('/api/users')\`
- Use interceptors (functional, Angular 15+) for auth tokens, error handling, logging.
- Implement retry logic for transient failures.
- Use loading states and error handling for every HTTP call.
- Cancel previous requests with switchMap for search/autocomplete.

## Testing

- Use TestBed for component testing with Angular's testing utilities.
- Use jest-preset-angular or the Angular CLI test runner.
- Test components: render, interact, assert. Test what users see and do.
- Mock services with jasmine.createSpyObj() or jest.fn().
- Use HttpClientTestingModule for HTTP testing.
- Test signals by reading their value: \`expect(component.count()).toBe(0)\`.

## Performance

- Use OnPush change detection on every component.
- Use trackBy function with @for loops: \`@for (item of items; track item.id)\`
- Lazy load routes and defer non-critical content with @defer.
- Use pure pipes for expensive template computations.
- Preload modules with PreloadAllModules or custom preloading strategies.

## Project Structure

- \`/src/app/features/\` — Feature modules/components
- \`/src/app/core/\` — Singleton services, guards, interceptors
- \`/src/app/shared/\` — Shared components, directives, pipes
- \`/src/app/models/\` — TypeScript interfaces and types
- \`/src/environments/\` — Environment configuration
`,
};
