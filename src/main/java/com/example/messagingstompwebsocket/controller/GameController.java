package com.example.messagingstompwebsocket.controller;

import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class GameController {
    @GetMapping("/game")
    public String game(){
        return "game";
    }

    @GetMapping
    public String home(){return "home";}
}
