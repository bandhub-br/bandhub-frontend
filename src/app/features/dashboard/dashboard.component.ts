import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  posts = [
    {
      id: 1,
      author: 'The Midnight Echo',
      avatar: 'https://i.pravatar.cc/150?img=11',
      time: '2 horas atrás',
      content: 'Acabamos de lançar nosso novo single "Neon Dreams"! Confiram nas plataformas de streaming e deixem nos comentários o que acharam. 🎸✨',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
      likes: 124,
      comments: 18
    },
    {
      id: 2,
      author: 'Lucas Drummer',
      avatar: 'https://i.pravatar.cc/150?img=12',
      time: '5 horas atrás',
      content: 'Procurando um baixista na região de São Paulo para projeto autoral de Indie Rock. Ensaios aos fins de semana. Alguém interessado?',
      likes: 45,
      comments: 12
    },
    {
      id: 3,
      author: 'Sonic Waves Festival',
      avatar: 'https://i.pravatar.cc/150?img=13',
      time: '1 dia atrás',
      content: 'Line-up oficial liberado! Ingressos do primeiro lote esgotando rápido. Quem vamos ver na grade este ano? 🤘🔥',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800',
      likes: 892,
      comments: 156
    }
  ];
}
