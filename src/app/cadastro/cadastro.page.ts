import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  private mensagem: string = '';
  formGroup: FormGroup = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(250),
      Validators.pattern(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      ),
    ]),
    senha: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AutenticacaoService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    // Lógica de inicialização, se necessário
  }

  cadastrar(): void {
    const { email, senha } = this.formGroup.value;
    this.authService
      .cadastroNoFirebase(email, senha)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.mensagem = 'Erro ao incluir usuário.';
        this.exibeMensagem(this.mensagem);
      });
  }

  async exibeMensagem(msg: string): Promise<void> {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    await toast.present();
  }
}
