let onUnauthorized = null;

const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

const notifyUnauthorized = () => {
  onUnauthorized?.();
};

export { setUnauthorizedHandler, notifyUnauthorized };
