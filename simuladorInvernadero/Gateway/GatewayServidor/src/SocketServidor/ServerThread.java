/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SocketServidor;

import com.google.gson.Gson;
import dominio.DatosSensor;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;

/**
 *
 * @author anacastillo
 */
public class ServerThread extends Thread {

    private Socket socket = null;
    private Socket socketRest = null;
    private Servidor server = null;
    private ObjectInputStream objectInputStream = null;
    private ObjectOutputStream objectOutputStream = null;

    public ServerThread(Servidor _server, Socket _socket) {
        server = _server;
        socket = _socket;
    }

    @Override
    public void run() {
        try {
            System.out.println("Gateway " + socket.getRemoteSocketAddress() + " conectado al servidor...");

            objectInputStream = new ObjectInputStream(socket.getInputStream());
            objectOutputStream = new ObjectOutputStream(socket.getOutputStream());

            while (true) {
                try {
                    String action = objectInputStream.readUTF();
                    switch (action) {
                        case "enviar":
                            // Obtenemos de cliente(gateway)..
                            Object object = objectInputStream.readObject();
                            DatosSensor dato = (DatosSensor) object;
                            server.addDato(dato);
                            System.out.println("Datos Recibidos: " + dato + " de " + socket.getRemoteSocketAddress() + " con éxito...");
                            // Enviamos datos al servicio rest para proceder a guardar..
                            System.out.println("Enviando datos al rest..");
                            Gson gson = new Gson();
                            System.out.println("Enviando: " + gson.toJson(dato));
                            try {
                                String postUrl = "http://localhost:3000/invernadero";
                                HttpClient httpClient = HttpClientBuilder.create().build();
                                HttpPost post = new HttpPost(postUrl);
                                StringEntity postingString = new StringEntity(gson.toJson(dato));
                                post.setEntity(postingString);
                                post.setHeader("Content-type", "application/json");
                                HttpResponse response = httpClient.execute(post);
                                System.out.println(response.toString());
                            } catch (IOException e) {
                              System.out.println("Error");
                            }
                            System.out.println("Esperando nuevos datos..");
                    }
                } catch (IOException e) {
                    break;
                }
            }
            objectInputStream.close();
            socket.close();
            System.out.println("Gateway " + socket.getRemoteSocketAddress() + " desconectado de servidor...");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
