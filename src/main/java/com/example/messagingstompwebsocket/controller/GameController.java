package com.example.messagingstompwebsocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.messagingstompwebsocket.model.Game;
import com.example.messagingstompwebsocket.model.Mensagem;
import com.google.gson.Gson;

@Controller
@RequestMapping("game")
public class GameController {
    @GetMapping("/{lobby}/{player}")
    public String game(@PathVariable String lobby, @PathVariable String player, Model model){
        model.addAttribute("sala", lobby);
        model.addAttribute("player", player);
        return "game";
    }

    @MessageMapping("/game/{id}/player1")
    @SendTo("/topic/game/{id}/player1")
    public Mensagem pl1(Game game) throws Exception {
        System.out.println(game);
        return new Mensagem(new Gson().toJson(game));
    }
    
    @MessageMapping("/game/{id}/player2")
    @SendTo("/topic/game/{id}/player2")
    public Mensagem pl2(Game game) throws Exception {
        System.out.println(game);
        return new Mensagem(new Gson().toJson(game));
    }
}
