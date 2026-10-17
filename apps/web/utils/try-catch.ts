type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E> = Success<T> | Failure<E>;

// Overloads
function tryCatch<T, E = Error>(
  promise: Promise<T>,
  defaultValue?: T,
): Promise<Result<T, E>>;

function tryCatch<T, E = Error>(
  callback: () => T,
  defaultValue?: T,
): Promise<Result<T, E>>;

function tryCatch<T, E = Error>(
  callback: () => T,
  defaultValue?: T,
): Promise<Result<T, E>>;

// Implementation
async function tryCatch<T, E = Error>(
  input: Promise<T> | (() => T),
  defaultValue?: T,
): Promise<Result<T, E>> {
  try {
    const result = typeof input === "function" ? input() : input;

    return { data: await result, error: null };
  } catch (error) {
    if (defaultValue != null) {
      return { data: defaultValue, error: null };
    }

    return { data: null, error: error as E };
  }
}

export default tryCatch;
