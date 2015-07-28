package br.unicesumar.escoladeti2015time04.utils.excecoes;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@SuppressWarnings("CallToPrintStackTrace")
public class ControllerDeExcecoes {

    @ResponseBody
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResultadoDeErro handleException(Exception e) {
        e.printStackTrace();

        ExcecaoPadrao excecaoPadrao = procuraExcecaoPadrao(e);
        String mensagemConsole;
        String mensagemUsuario;

        if (excecaoPadrao != null) {
            mensagemConsole = excecaoPadrao.getMessage();
            mensagemUsuario = excecaoPadrao.getMensagemUsuario();
        } else {
            mensagemConsole = e.getMessage();
            mensagemUsuario = "Ocorreu um problema!<br>Por favor tente novamente";
        }

        return new ResultadoDeErro(mensagemConsole, mensagemUsuario);

    }

    private ExcecaoPadrao procuraExcecaoPadrao(Throwable e) {
        if (e == null) {
            return null;
        } else if (e instanceof ExcecaoPadrao) {
            return (ExcecaoPadrao) e;
        } else {
            return procuraExcecaoPadrao(e.getCause());
        }
    }

//    @ResponseBody
//    @ExceptionHandler(CampoInvalido.class)
//    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
//    public ResultadoDeErro handleException(CampoInvalido e) {
//        e.printStackTrace();
//        String mensagemConsole = e.getMessage();
//        String mensagemUsuario = e.getMensagemUsuario();
//        return new ResultadoDeErro(mensagemConsole, mensagemUsuario);
//    }
//        @ResponseBody
//        @ExceptionHandler(RuntimeException.class)
//        @ResponseStatus(value = HttpStatus.BAD_REQUEST)
//        public ResultadoDeErro handleException(RuntimeException e) {
//            e.printStackTrace();
//            String userMessage = e.getMessage();
//            String developerMessage = e.getLocalizedMessage();
//            return new ResultadoDeErro(userMessage, developerMessage);
//        }
//        @ResponseBody
//        @ExceptionHandler(DataIntegrityViolationException.class)
//        @ResponseStatus(value = HttpStatus.BAD_REQUEST)
//        public ResultadoDeErro handleDataIntegrityViolationException(DataIntegrityViolationException e) {
//            e.printStackTrace();
//
//            return new ResultadoDeErro(e.getCause().getCause().getMessage(), e.getCause().getCause().getLocalizedMessage());
//        }
//
//        @ExceptionHandler(HttpMessageNotReadableException.class)
//        @ResponseBody
//        @ResponseStatus(value = HttpStatus.BAD_REQUEST)
//        public ResultadoDeErro handleValidationException(HttpMessageNotReadableException e) {
//            e.printStackTrace();
//            System.out.println(e.getClass());
//            return new ResultadoDeErro(e.getMostSpecificCause().getMessage(), e.getLocalizedMessage());
//        }
//        @ExceptionHandler(TransactionSystemException.class)
//        @ResponseBody
//        @ResponseStatus(value = HttpStatus.BAD_REQUEST)
//        public ResultadoDeErro handleConstraintViolationException(TransactionSystemException e) {
//            System.out.println(e.getClass());
//            e.printStackTrace();
//            StringBuilder builder = new StringBuilder();
//
//            //Percorrer  as constantes violadas, armazenando qual campo, e a mensagem de validação
//            if (e.getCause() != null
//                    && e.getCause().getCause() instanceof ConstraintViolationException) {
//                ConstraintViolationException except = (ConstraintViolationException) e.getCause().getCause();
//                for (ConstraintViolation<?> violation : except.getConstraintViolations()) {
//                    builder.append(violation.getPropertyPath());
//                    builder.append(" ");
//                    builder.append(violation.getMessage());
//                    builder.append("\n");
//                }
//                return new ResultadoDeErro(builder.toString(), e.getMessage());
//            }
//
//            return new ResultadoDeErro("Erro ao salvar", e.getLocalizedMessage());
//        }
//        @ExceptionHandler(MethodArgumentNotValidException.class)
//        @ResponseStatus(HttpStatus.BAD_REQUEST)
//        @ResponseBody
//        public ResultadoDeErro processValidationError(MethodArgumentNotValidException ex) {
//            BindingResult result = ex.getBindingResult();
//            List<FieldError> fieldErrors = result.getFieldErrors();
//            StringBuilder builder = new StringBuilder();
//            ex.printStackTrace();
//            for (FieldError error : fieldErrors) {
//                builder.append("*");
//                builder.append(error.getDefaultMessage());
//                builder.append("<br>");
//            }
//
//            return new ResultadoDeErro(builder.toString(), builder.toString());
//        }
}
