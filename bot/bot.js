import chalk from 'chalk';
import readline from 'readline';

// Terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función efecto "escribiendo"
function escribir(texto, color = chalk.white, velocidad = 25, callback) {
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(color(texto[i]));
    // efecto de sonido: beep suave en cada letra
    process.stdout.write('\x07');
    i++;
    if (i === texto.length) {
      clearInterval(interval);
      process.stdout.write("\n");
      if (callback) callback();
    }
  }, velocidad);
}

// Animación tipo "cargando hechizo"
function animacionHechizo(mensaje, callback) {
  const frames = ['🕯️ ', '🕯️✨', '🕯️✨💨', '🕯️💨', '💨 '];
  let i = 0;
  escribir(mensaje, chalk.yellow.bold, 40, () => {
    const interval = setInterval(() => {
      process.stdout.write(`\r${frames[i % frames.length]} `);
      i++;
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
      process.stdout.write("\r      \r"); // limpiar línea
      if (callback) callback();
    }, 1500);
  });
}

// Bienvenida
escribir(chalk.magenta.bold("🕯️ Bienvenido, viajero, a la cripta de Jherson Deiner Micha Espinoza..."), chalk.magenta.bold, 25, () => {
  escribir(chalk.gray("Aquí se revelan secretos de Web3 y hechizos del desarrollo web."), chalk.gray, 25, () => {
    escribir(chalk.cyan("Escribe 'invocar', 'proyectos', 'contacto', 'me', 'ayuda' o 'salir' para continuar."), chalk.cyan, 25, () => {
      rl.setPrompt(chalk.magenta("🕯️ > "));
      rl.prompt();
    });
  });
});

// Procesar comandos
function procesarComando(comando) {
  switch (comando.toLowerCase()) {

    case 'invocar':
      escribir("💀 Saludos, alma curiosa. Soy Jherson, maestro de Web3, dApps y criptomagia.", chalk.red.bold, 40, () => rl.prompt());
      break;

    case 'proyectos':
      animacionHechizo("📜 Invocando mis obras de poder...", () => {
        const proyectos = [
          { nombre: "Mini dApp NFT", descripcion: "Aplicación descentralizada para coleccionables digitales.", tecnologias: "Solidity, Web3.js, React" },
          { nombre: "Crypto Dashboard", descripcion: "Panel interactivo para seguimiento de criptomonedas.", tecnologias: "React, Next.js, TailwindCSS, APIs" },
          { nombre: "Bot de Automatización", descripcion: "Automatiza tareas repetitivas y scraping de datos.", tecnologias: "Node.js, Python, Puppeteer" },
          { nombre: "Página Web Corporativa", descripcion: "Sitio web profesional para negocios y portfolios.", tecnologias: "HTML, CSS, JavaScript, React" },
          { nombre: "Scripts Full Stack", descripcion: "Scripts personalizados para manejo de datos y APIs.", tecnologias: "Node.js, Python, REST/GraphQL" },
          { nombre: "Desarrollo de Software", descripcion: "Aplicaciones completas con bases de datos y backend.", tecnologias: "Node.js, Express, MongoDB, PostgreSQL" }
        ];

        let i = 0;

        function escribirProyecto() {
          if (i < proyectos.length) {
            escribir(`- ${proyectos[i].nombre}: ${proyectos[i].descripcion}`, chalk.yellowBright, 25, () => {
              escribir(`  Tecnologías: ${proyectos[i].tecnologias}\n`, chalk.yellowBright, 25, () => {
                i++;
                escribirProyecto(); // Continúa con el siguiente proyecto
              });
            });
          } else {
            rl.prompt(); // Termina la lista
          }
        }

        escribirProyecto(); // Comienza la animación
      });
      break;

    case 'contacto':
      escribir("✉️ Para enviar un mensaje místico: " + chalk.underline("droklook@gmail.com") + "\n", chalk.green.bold, 40, () => rl.prompt());
      break;

    case 'me':
      animacionHechizo("🪄 Revelando los secretos de Jherson...", () => {
        escribir("🧙‍♂️ Soy Jherson Deiner Micha Espinoza, Full Stack Web Developer autodidacta.", chalk.magenta.bold, 40, () => {
          escribir("⚡ Experto en Web3, dApps, APIs y automatización de procesos.", chalk.cyan, 40, () => {
            escribir("🛠️ Domino React, Next.js, Tailwind, Node.js, Python, Solidity y bases de datos.", chalk.yellowBright, 40, () => {
              escribir("🚀 Si me contratas, obtendrás alguien creativo, resolutivo y apasionado por el desarrollo moderno.", chalk.green.bold, 40, () => rl.prompt());
            });
          });
        });
      });
      break;

    case 'ayuda':
      escribir("📖 Comandos disponibles:", chalk.blue.bold, 30, () => {
        escribir("- 'invocar' : Saludo místico.", chalk.blue, 30, () => {
          escribir("- 'proyectos' : Muestra tus proyectos destacados.", chalk.blue, 30, () => {
            escribir("- 'contacto' : Información para contactarte.", chalk.blue, 30, () => {
              escribir("- 'me' : Describe por qué deberías ser contratado.", chalk.blue, 30, () => {
                escribir("- 'ayuda' : Muestra este mensaje.", chalk.blue, 30, () => {
                  escribir("- 'salir' : Termina la sesión.\n", chalk.blue, 30, () => rl.prompt());
                });
              });
            });
          });
        });
      });
      break;

    case 'salir':
      escribir("🌙 Que tu camino sea oscuro y lleno de conocimiento. Hasta pronto.\n", chalk.gray, 40, () => rl.close());
      break;

    default:
      escribir("⚠️ Hechizo desconocido. Prueba 'invocar', 'proyectos', 'contacto', 'me', 'ayuda' o 'salir'.\n", chalk.red, 40, () => rl.prompt());
  }
}

// Escuchar comandos
rl.on('line', (input) => {
  procesarComando(input);
});
