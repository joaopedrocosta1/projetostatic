import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string = '';
  public senha: string = '';
  public mensagem: string = '';

  constructor(
    private authService: AutenticacaoService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    // Inicializações no componente, caso necessário
  }

  loginUsuario(): void {
    this.authService.loginNoFireBase(this.email, this.senha)
      .then((res: any) => {
        console.log('res = ', res);
        this.router.navigate(['/home']);
      })
      .catch((error: any) => {
        console.log('error = ', error);
        this.mensagem = 'Erro ao fazer login do usuário.';
        this.exibeMensagem();
      });
  }

  async exibeMensagem(): Promise<void> {
    const toast = await this.toastController.create({
      message: this.mensagem,
      duration: 2000,
    });
    await toast.present();
  }

  cadastroPage(): void {
    this.router.navigate(['/cadastro']);
  }
}
