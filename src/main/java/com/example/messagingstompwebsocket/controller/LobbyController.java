package com.example.messagingstompwebsocket.controller;

import javax.websocket.EndpointConfig;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.messagingstompwebsocket.model.Game;
import com.example.messagingstompwebsocket.model.Mensagem;
import com.google.gson.Gson;

@Controller
@RequestMapping("/lobby")
public class LobbyController {
    @GetMapping("/{lobby}")
    public String game(@PathVariable String lobby, Model model){
        model.addAttribute("sala", lobby);
        return "lobby";
    }

    @MessageMapping("/lobby/{id}/game")
    @SendTo("/topic/lobby/{id}/game")
    public Mensagem lobby(Game game) throws Exception {
        System.out.println(game);
        return new Mensagem(new Gson().toJson(game));
    }

    @MessageMapping("/lobby/{id}/state")
    @SendTo("/topic/lobby/{id}/state")
    public Mensagem state() throws Exception {
        Game game = new Game();
        game.setPl1("PL01");
        return new Mensagem(new Gson().toJson(game));
    }

    @OnOpen
    public void open(final Session session) {
        System.out.println("-> "+ session);
    }


}
