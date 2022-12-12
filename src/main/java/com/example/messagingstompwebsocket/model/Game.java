package com.example.messagingstompwebsocket.model;

import java.util.Arrays;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class Game {
    private String pl1;
    private String pl2;
    private String[] tab = new String[9];
    private String win;
}
