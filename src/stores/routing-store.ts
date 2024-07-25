import { createStore, useStore } from 'zustand';
type RoutingStore = {
    routing: boolean;
    actions: {
        setRouting: (routing: boolean) => void;
    };
};
const routingStore = createStore<RoutingStore>()((set, get) => ({
    routing: false,
    actions: {
        setRouting: (routing: boolean) => {
            set({
                routing,
            });
        },
    },
}));
export type ExtractState<S> = S extends {
    getState: () => infer T;
}
    ? T
    : never;
type Params<U> = Parameters<typeof useStore<typeof routingStore, U>>;
// Selectors
const routingSelector = (state: ExtractState<typeof routingStore>) => state.routing;
const actionsSelector = (state: ExtractState<typeof routingStore>) => state.actions;
// getters
export const getRoutingActions = () => actionsSelector(routingStore.getState());
export const getRouting = () => routingSelector(routingStore.getState());
function useRoutingStore<U>(selector: Params<U>[1]) {
    return useStore(routingStore, selector);
}
// Hooks
export const useRoutingActions = () => useRoutingStore(actionsSelector);
export const useRouting = () => useRoutingStore(routingSelector);
