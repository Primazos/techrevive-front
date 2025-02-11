import motherboard from "../../../assets/images/motherboard.jpg";
import hdd from "../../../assets/images/hdd.jpg";
import memory_ram from "../../../assets/images/memory_ram.jpg";
import graphics_cards from "../../../assets/images/graphic_card.jpg";
import power_supply from "../../../assets/images/power_supply.jpg";
import cpu from "../../../assets/images/cpu.jpg";

export const CATEGORIES = [
  {
    name: "Placas Base",
    ddbb_name: "placa-base",
    image: motherboard,
  },
  {
    name: "CPU",
    ddbb_name: "cpu",
    image: cpu,
  },
  {
    name: "Discos Duros",
    ddbb_name: "disco-duro",
    image: hdd,
  },
  {
    name: "Tarjetas Gráficas",
    ddbb_name: "tarjeta-grafica",
    image: graphics_cards,
  },
  {
    name: "Memorias RAM",
    ddbb_name: "memoria-ram",
    image: memory_ram,
  },
  {
    name: "Alimentación",
    ddbb_name: "fuente-de-alimentacion",
    image: power_supply,
  },
];
