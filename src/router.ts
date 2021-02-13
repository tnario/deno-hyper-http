import { createRouteController, Route, RouteController } from "./containers.ts";
import { CallBack } from "./types.ts";

export interface Router extends RouteController {
  _middleware: CallBack[];
  _routes: Route[];
  use: (...middleware: CallBack[]) => void;
}

export function createRouter(): Router {
  const routerLevelHandlers: CallBack[] = [];
  const { routesTable, routeController } = createRouteController();

  function use(...middleware: CallBack[]) {
    routerLevelHandlers.push(...middleware);
  }

  return {
    get _middleware() {
      return routerLevelHandlers;
    },

    get _routes() {
      return routesTable;
    },
    use,
    ...routeController,
  };
}
