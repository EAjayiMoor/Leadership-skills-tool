export interface UnsavedNavigationState {
  url: string;
  state: unknown;
}
declare global {
  interface Window {
    __assessmentUnsavedNavigation?: UnsavedNavigationState;
  }
}
// Register before the App Router: its synchronous unmount can remove a
// page-level listener before it receives a window-target popstate event.
export const unsavedNavigationBootstrap = `window.addEventListener('popstate',function(event){var guard=window.__assessmentUnsavedNavigation;if(guard&&!window.confirm('Leave this page? Changes since your last save will be lost.')){event.stopImmediatePropagation();window.history.pushState(guard.state,'',guard.url);}});`;
