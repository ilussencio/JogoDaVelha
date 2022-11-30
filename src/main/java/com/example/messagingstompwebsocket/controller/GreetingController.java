package com.example.messagingstompwebsocket.controller;
import com.example.messagingstompwebsocket.bean.Greeting;
import com.example.messagingstompwebsocket.bean.HelloMessage;
import com.example.messagingstompwebsocket.bean.Jogada;
import com.google.gson.Gson;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {


  @MessageMapping("/hello/{id}")
  @SendTo("/topic/greetings/{id}")
  public Greeting greeting1(String id, Jogada jogada) throws Exception {
    System.out.println(id);
    return new Greeting(new Gson().toJson(jogada));
  }

}
