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
    @GetMapping("/{lobby}/{player}")
    public String game(@PathVariable String lobby, @PathVariable String player, Model model){
        model.addAttribute("sala", lobby);
        model.addAttribute("player", player);
        return "lobby";
    }

    @MessageMapping("/lobby/{id}/player1")
    @SendTo("/topic/lobby/{id}/player1")
    public Mensagem pl1(String name) throws Exception {
        Thread.currentThread().sleep(1000);
        return new Mensagem(new Gson().toJson(name));
    }

    
    @MessageMapping("/lobby/{id}/player2")
    @SendTo("/topic/lobby/{id}/player2")
    public Mensagem pl2(String name) throws Exception {
        Thread.currentThread().sleep(1000);
        return new Mensagem(new Gson().toJson(name));
    }
}
