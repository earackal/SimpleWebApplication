package com.springBootProjects.SimpleWebApplication.exception;

public class UserNotLoggedInException extends RuntimeException{
    public UserNotLoggedInException(String message){
        super(message);
    }
}
