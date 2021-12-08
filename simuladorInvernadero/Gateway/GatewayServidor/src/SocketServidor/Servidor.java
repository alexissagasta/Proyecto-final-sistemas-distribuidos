/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SocketServidor;

import dominio.DatosSensor;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author anacastillo
 */
public class Servidor implements Runnable{

    /**
     * @param args the command line arguments
     */
    
    private int port = 8081;
    private ServerSocket serverSocket = null;
    private Thread thread = null;
    private ServerThread client = null;
    private List<DatosSensor> datoSensor = new ArrayList<DatosSensor>();

    public Servidor() {
        try {
            serverSocket = new ServerSocket(port);
            System.out.println("Servidor comenzó en el puerto " + serverSocket.getLocalPort() + "...");
            System.out.println("Esperando al cliente...");
            thread = new Thread(this);
            thread.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
     @Override
    public void run() {
       while (thread != null) {
            try {
                // Esperando al cliente se conecte..
                addThreadClient(serverSocket.accept());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void addThreadClient(Socket socket) {
        client = new ServerThread(this, socket);
        client.start();
    }
    
    public void addDato(DatosSensor dato){
        datoSensor.add(dato);
    }
    public int getDato(){
        return datoSensor.size(); 
    }
   
    public static void main(String[] args) {
        Servidor servidor = new Servidor();
    }
    
}

