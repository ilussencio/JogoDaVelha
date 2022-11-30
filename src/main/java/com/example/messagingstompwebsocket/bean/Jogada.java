package com.example.messagingstompwebsocket.bean;

public class Jogada {
    private String jogador;
    private int posicao;

    public Jogada(String jogador, int posicao) {
        this.jogador = jogador;
        this.posicao = posicao;
    }

    public String getJogador() {
        return jogador;
    }

    public void setJogador(String jogador) {
        this.jogador = jogador;
    }

    public int getPosicao() {
        return posicao;
    }

    public void setPosicao(int posicao) {
        this.posicao = posicao;
    }
}
