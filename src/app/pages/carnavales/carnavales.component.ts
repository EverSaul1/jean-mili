import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {INVITATION_CONFIG_CARNAVAL} from "../../shared/invitation-config-carnval";
import {INVITATION_CONFIG} from "../../shared/invitation-config";

@Component({
  selector: 'app-carnavales',
  standalone: true,
  imports: [
    DecimalPipe,
    UpperCasePipe,
    TitleCasePipe
  ],
  templateUrl: './carnavales.component.html',
  styleUrl: './carnavales.component.scss'
})
export class CarnavalesComponent implements OnInit, OnDestroy{

  @ViewChildren('foto') fotos!: QueryList<ElementRef<HTMLImageElement>>;
  invitation = INVITATION_CONFIG_CARNAVAL;
  audio: HTMLAudioElement;
  isPlaying = false;
  url = 'huayno.mp3';
  isOpenInvitation: boolean = false;
  isCardOpen = false;
  invitationOpen = false;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  private observer!: IntersectionObserver;
  private ready = false;

  private intervalId: any;
  private targetDate = new Date(this.invitation.date).getTime();



  ngOnInit(): void {
    this.createSnowflakes();
    this.startCountdown();
  }
  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  openCard() {
    this.isCardOpen = true; // Activa la animación de apertura
  }

  closeCard() {
    this.isCardOpen = false; // Vuelve a cerrar la carta
  }

  openInvitation() {
    this.invitationOpen = true; // Muestra el contenido de la invitación
  }
  constructor() {
    this.audio = new Audio(this.url);
    this.audio.loop = true;
    this.audio.volume = 0.8;
  }

  whatsappUrl() {
    const msg = encodeURIComponent(this.invitation.whatsappMessage);
    return `https://wa.me/${this.invitation.whatsappPhone}?text=${msg}`;
  }

  openWhatsapp() {
    const url = this.whatsappUrl();
    // abre en nueva pestaña/ventana de forma segura
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  scrollToInvitation(): void {
    document
      .getElementById('invitation-section')
      ?.scrollIntoView({ behavior: 'smooth' });

    this.playMusic();
    this.isOpenInvitation = true;
  }

  playMusic(): void {
    if (this.isPlaying) return;
    this.audio.play()
      .then(() => this.isPlaying = true)
      .catch(() => {
        // por si acaso el navegador la bloquea (no debería, porque hubo click)
        this.isPlaying = false;
      });
  }

  pauseMusic(): void {
    this.audio.pause();
    this.isPlaying = false;
  }

  toggleMusic(): void {
    this.isPlaying ? this.pauseMusic() : this.playMusic();
  }



  createSnowflakes(): void {
    const TOTAL_SNOWFLAKES = 30;
    const colors = ['#FF3B3B', '#FFD93D', '#4D96FF', '#961bad', '#B983FF', '#B983FF'];

    const createSnowflake = () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const snowflake = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );

      snowflake.setAttribute("class", "snowflake");
      snowflake.setAttribute("width", "20");
      snowflake.setAttribute("height", "20");
      snowflake.setAttribute("viewBox", "0 0 16 16");

      // posición + animación random
      snowflake.style.left = Math.random() * 100 + "vw";
      snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";
      snowflake.style.animationDelay = Math.random() * 5 + "s";
      snowflake.style.transform = `rotate(${Math.random() * 360}deg)`;

      snowflake.innerHTML = `
      <path
        fill="${randomColor}"
        d="M4 2c2 3-2 5 0 8s-2 5 0 8c1 2 4 2 5 0
           2-3-2-5 0-8s-2-5 0-8c1-2-3-3-5 0z"
      />
    `;

      document.body.appendChild(snowflake);

      snowflake.addEventListener("animationend", () => {
        snowflake.remove();
        createSnowflake(); // vuelve a crear otro
      });
    };

    // 🔥 CREAR VARIOS DESDE EL INICIO
    for (let i = 0; i < TOTAL_SNOWFLAKES; i++) {
      createSnowflake();
    }
  }



  ngAfterViewInit() {

  }

  onImgsReady() {
    if (this.ready) return;   // evitar llamar varias veces
    this.ready = true;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target as HTMLImageElement;

          if (entry.intersectionRatio < 0.5) {
            img.style.transform = 'scale(0.8)';
          } else {
            img.style.transform = 'scale(1)';
          }
        });
      },
      { threshold: [0, 0.5, 1] }
    );

    this.fotos.forEach(f => this.observer.observe(f.nativeElement));
  }

  private startCountdown() {
    this.intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.targetDate - now;

      if (distance <= 0) {
        clearInterval(this.intervalId);
        this.days = this.hours = this.minutes = this.seconds = 0;
        return;
      }

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
  }

  //AÑADIR AL GOOGLE CALENDAR

  addToGoogleCalendar() {
    const title = encodeURIComponent('Carnavales chiuchico');
    const details = encodeURIComponent('¡Acompáñanos en este dia especial!');
    const location = encodeURIComponent('San Antonio de Putina 21340, Perú');

    // Formato ISO: YYYYMMDDTHHmmssZ
    const start = '20251225T080000Z'; // 8am Perú = 13:00 UTC
    const end = '20251225T220000Z';   // 10am Perú = 15:00 UTC

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  }

  openGoolemap(text: string) {
    if(text === 'iglesia') {
      window.open(this.invitation.maps.iglesia, '_blank');
    } else if(text === 'local') {
      window.open(this.invitation.maps.local, '_blank');
    }
  }

  loadMasonry() {
    const grid: any = document.getElementById("masonry");
    const items = Array.from(grid.children);

    // Organiza manualmente la altura de cada columna
    let columnHeights: any = {};

    items.forEach((item: any) => {
      const col: any = Object.keys(columnHeights).sort(
        (a, b) => columnHeights[a] - columnHeights[b]
      )[0] || "0";

      columnHeights[col] = (columnHeights[col] || 0) + item.offsetHeight;
    });
  }
}
