package br.com.antonio.mensageria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications") // Mapeia a URL base
public class NotificationController {

    @Autowired
    private KafkaProducer kafkaProducer;

    @PostMapping("/send-notification")
    public ResponseEntity<String> sendNotification(@RequestBody Notification notification) {
        //kafkaProducer.sendMessage(notification);
        return ResponseEntity.ok("Notificação enviada com sucesso!");
    }
}
