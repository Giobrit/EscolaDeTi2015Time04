package br.unicesumar.escoladeti2015time04.itemAcesso;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/itemAcesso")
public class ItemAcessoController {

    @Autowired
    private ItemAcessoService service;

    @RequestMapping(method = RequestMethod.GET)
    public List<Map<String, Object>> getItensAcesso() {
        return service.findAll();
    }

    @RequestMapping(value = "/findById")
    public List<Map<String, Object>> getItensAcessoById(@RequestParam Long id) {
        return service.findById(id);
    }

    @RequestMapping(value = "/findBySuperior")
    public List<Map<String, Object>> getItensAcessoBySuperior(@RequestParam Long idSuperior) {
        return service.findBySuperior(idSuperior);
    }
}
