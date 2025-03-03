import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { keyframes } from "@mui/system";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

function Main() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Captura de información del dispositivo
        const userAgent = navigator.userAgent;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const language = navigator.language || navigator.userLanguage;
        const platform = navigator.platform;
        const colorDepth = window.screen.colorDepth;
        const orientation = window.screen.orientation
          ? window.screen.orientation.type
          : "unknown";
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const timestamp = new Date().toISOString();

        // Solicitud POST para obtener información de la IP
        const response = await fetch("https://apichris.vercel.app/web", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userAgent,
            screenWidth,
            screenHeight,
            language,
            platform,
            colorDepth,
            orientation,
            windowWidth,
            windowHeight,
            timestamp,
          }),
        });

        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }

        const data = await response.json();
        setResponseData(data); // Almacena la respuesta en el estado
      } catch (error) {
        console.error(error); // Manejo de errores
        setError("Error al obtener los datos. Inténtalo más tarde."); // Mensaje de error
      }
    };

    fetchData(); // Llama a la función para obtener datos
  }, []);

  console.log(responseData); // Muestra la respuesta en la consola

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          color: "lime",
          animation: `${bounce} 0.8s infinite`, // Aplicando la animación
          textAlign: "center",
          marginTop:"30px",
          marginBottom: "20px",
        }}
      >
        ¿Cuál es mi IP?
      </Typography>
      {error && <Typography color="error">{error}</Typography>} {/* Mensaje de error */}
      
      {/* Información sobre ubicación */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
          fontStyle: "italic",
          color: "gray",
        }}
      >
        *Nota: Los datos proporcionados de ubicación y geolocalización 
        no corresponden a la ubicación exacta, ya que dependen de 
        la información proporcionada por el proveedor de servicios de 
        IP, que puede no reflejar la ubicación real del dispositivo.*
      </Typography>

      {responseData && (
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ marginTop: "20px" }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: "lime" }}>
                  IP
                </Typography>
                <Typography variant="body2">
                  IP: {responseData.ipInfo.ip || "No disponible"}
                </Typography>
                <Typography variant="body2">
                  Hostname: {responseData.ipInfo.hostname || "No disponible"}
                </Typography>
                <Typography variant="body2">
                  Ciudad: {responseData.ipInfo.city || "No disponible"}
                </Typography>
                <Typography variant="body2">
                  Región: {responseData.ipInfo.region || "No disponible"}
                </Typography>
                <Typography variant="body2">
                  País: {responseData.ipInfo.country || "No disponible"}
                </Typography>
                <Typography variant="body2">
                  Código Postal: {responseData.ipInfo.postal || "No disponible"}
                </Typography>
                <Typography variant="body2">
                  Ubicación: {responseData.ipInfo.loc || "No disponible"}
                </Typography>
                <Typography variant="body2">
                  Zona Horaria: {responseData.ipInfo.timezone || "No disponible"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: "lime" }}>
                  Sistema
                </Typography>
                <Typography variant="body2">
                  User Agent: {responseData.clientData.userAgent || "No disponible"}
                </Typography>
                <Typography variant="body2">
                  Plataforma: {responseData.clientData.platform || "No disponible"}
                </Typography>
                <Typography variant="body2">
                  Idioma: {responseData.clientData.language || "No disponible"}
                </Typography>
                <Typography variant="body2">
                  Orientación: {responseData.clientData.orientation || "No disponible"}
                </Typography>
                <Typography variant="body2">
                  Profundidad de Color: {responseData.clientData.colorDepth || "No disponible"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: "lime" }}>
                  Pantalla
                </Typography>
                <Typography variant="body2">
                  Ancho: {responseData.clientData.screenWidth}px
                </Typography>
                <Typography variant="body2">
                  Alto: {responseData.clientData.screenHeight}px
                </Typography>
                <Typography variant="body2">
                  Ancho de la Ventana: {responseData.clientData.windowWidth}px
                </Typography>
                <Typography variant="body2">
                  Alto de la Ventana: {responseData.clientData.windowHeight}px
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: "lime" }}>
                  Timestamp
                </Typography>
                <Typography variant="body2">
                  {responseData.clientData.timestamp || "No disponible"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Main;
