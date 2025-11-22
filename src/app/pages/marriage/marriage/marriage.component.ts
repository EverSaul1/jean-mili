import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
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

  @ViewChildren('foto') fotos!: QueryList<ElementRef<HTMLImageElement>>;
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

    function createSnowflake() {
      const snowflake = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      snowflake.setAttribute("class", "snowflake");
      snowflake.setAttribute("width", "20");
      snowflake.setAttribute("height", "20");
      snowflake.setAttribute("viewBox", "0 0 16 16");

      // Posición y animación aleatorias
      snowflake.style.left = Math.random() * 100 + "vw";
      snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";
      snowflake.style.animationDelay = Math.random() * 5 + "s";



//#E6F1FF

      // SVG del copo de nieve
      snowflake.innerHTML = `
              <path fill="#FFFFFF" d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z"/>
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
