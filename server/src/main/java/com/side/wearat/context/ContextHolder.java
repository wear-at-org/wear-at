package com.side.wearat.context;

import java.util.HashMap;

public class ContextHolder {
    private static ThreadLocal<HashMap<ContextKey, Object>> context = ThreadLocal.withInitial(() -> new HashMap<>());

    public enum ContextKey {
        UserID,
        NickName,
        Email,
    }

    public static Object get(ContextKey key) {
        return context.get().get(key);
    }

    public static void set(ContextKey key, Object value) {
        context.get().put(key, value);
    }
}
