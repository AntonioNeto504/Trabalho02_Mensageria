package br.com.antonio.mensageria;

public class Notification {
    private String code;
    private String message;
    private PriorityEnum priority;

    public Notification(String code, String message, PriorityEnum priority) {
        this.code = code;
        this.message = message;
        this.priority = priority;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public PriorityEnum getPriority() {
        return priority;
    }
}
