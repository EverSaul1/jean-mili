import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {INVITATION_CONFIG} from "../../../shared/invitation-config";
import {DecimalPipe, NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-marriage',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './marriage.component.html',
  styleUrl: './marriage.component.scss'
})
export class MarriageComponent implements OnInit, AfterViewInit, OnDestroy{
  invitation = INVITATION_CONFIG;
  audio: HTMLAudioElement;
  isPlaying = false;
  url = 'married3.mp3';
  isOpenInvitation: boolean = false;
  isCardOpen = false;
  invitationOpen = false;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
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
    const TOTAL_SNOWFLAKES = 100;

    function createSnowflake() {
      const snowflake = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      snowflake.setAttribute("class", "snowflake");
      snowflake.setAttribute("width", "20");
      snowflake.setAttribute("height", "20");
      snowflake.setAttribute("viewBox", "0 0 24 24");

      // Posición y animación aleatorias
      snowflake.style.left = Math.random() * 100 + "vw";
      snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";
      snowflake.style.animationDelay = Math.random() * 5 + "s";

      // SVG del copo de nieve
      snowflake.innerHTML = `
            <path fill="#E6F1FF" d="M12 2L13 8H17L14 10L15 16L12 14L9 16L10 10L7 8H11L12 2Z"/>
        `;

      document.body.appendChild(snowflake);

      // Eliminar después de que termine la animación
      snowflake.addEventListener("animationend", () => {
        snowflake.remove();
        createSnowflake(); // Crear un nuevo copo
      });
    }

    // Crear copos de nieve
    for (let i = 0; i < TOTAL_SNOWFLAKES; i++) {
      setTimeout(createSnowflake, i * 200);
    }
  }


  ngAfterViewInit(): void {

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
    const title = encodeURIComponent('Boda de Jean y Meli');
    const details = encodeURIComponent('¡Acompáñanos en nuestro gran día!');
    const location = encodeURIComponent('Juliaca, Perú');

    // Formato ISO: YYYYMMDDTHHmmssZ
    const start = '20251206T130000Z'; // 8am Perú = 13:00 UTC
    const end = '20251206T220000Z';   // 10am Perú = 15:00 UTC

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

}
