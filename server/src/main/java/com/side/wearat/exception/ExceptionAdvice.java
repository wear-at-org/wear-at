package com.side.wearat.exception;

import com.side.wearat.model.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.PrintWriter;
import java.io.StringWriter;

@Slf4j
@ControllerAdvice
public class ExceptionAdvice {
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleUnexpectedException(Exception e) {
        this.log("global", e);
        var resp = this.makeErrorResponse("global", e);
        return new ResponseEntity(resp, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = UnAuthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnAuthorizedException(Exception e) {
        this.log("auth", e);
        var resp = this.makeErrorResponse("auth", e);
        return new ResponseEntity(resp, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = ForbiddenException.class)
    public ResponseEntity<ErrorResponse> handleForbiddenException(Exception e) {
        this.log("forbidden", e);
        var resp = this.makeErrorResponse("forbidden", e);
        return new ResponseEntity(resp, HttpStatus.FORBIDDEN);
    }

    private ErrorResponse makeErrorResponse(String status, Exception e) {
        return new ErrorResponse(status, e.getMessage());
    }

    private void log(String status, Exception e) {
        try {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);

            MDC.put("error", e.getMessage());
            MDC.put("stack", sw.toString());
            //log.error(status);
            log.error(e.getMessage());
        } catch (Exception ex) {
        }
    }
}
