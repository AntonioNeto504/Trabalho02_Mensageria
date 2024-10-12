package br.com.antonio.mensageria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KafkaProducer {
    private static final String HIGH_PRIORITY_TOPIC = "high-notification";
    private static final String MID_PRIORITY_TOPIC = "mid-notification";
    private static final String LOW_PRIORITY_TOPIC = "low-notification";

    private final List<Notification> midPriorityBatch = new ArrayList<>();
    private final List<Notification> lowPriorityBatch = new ArrayList<>();

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

//    public void sendMessage(Notification notification) {
//        switch (notification.getPriority()) {
//            case HIGH:
//                kafkaTemplate.send(HIGH_PRIORITY_TOPIC, notification.getCode(), notification.getMessage());
//                break;
//
//            case MID:
//                midPriorityBatch.add(notification);
//                if (midPriorityBatch.size() >= 5) {
//                    sendBatch(midPriorityBatch, MID_PRIORITY_TOPIC);
//                }
//                break;
//
//            case LOW:
//                lowPriorityBatch.add(notification);
//                if (lowPriorityBatch.size() >= 10) {
//                    sendBatch(lowPriorityBatch, LOW_PRIORITY_TOPIC);
//                }
//                break;
//        }
//    }
//
//    private void sendBatch(List<Notification> batch, String topic) {
//        for (Notification notification : batch) {
//            kafkaTemplate.send(topic, notification.getCode(), notification.getMessage());
//        }
//        batch.clear();
//    }
}
