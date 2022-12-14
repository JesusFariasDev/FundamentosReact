import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import { cadastroUsuario } from '../../services/Service';
import User from '../../models/User';
import { Link, useNavigate } from 'react-router-dom';
import './CadastroUsuario.css';
import { Box } from '@mui/material';

function CadastroUsuario(){

    let history = useNavigate();
        const [confirmarSenha, setConfirmarSenha] = useState<String>("")
        const [user, setUser] = useState<User>(
            {
                id: 0,
                nome: "",
                usuario: "",
                senha: ""
            }
        )
    
        const [userResult, setUserResult] = useState<User>(
            {
                id: 0,
                nome: "",
                usuario: "",
                senha: ""
            }
        )
//encaminhando direto para a área de login
//verifica se o id do UserResult foi alterado, ou seja, se o backend retonou algo
        useEffect(() => {
            if (userResult.id != 0){
                history("/login")
            }
        }, [userResult])
//captura o valor armazenado no campo confirmar senha e envia para o onSubmit usar
        function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
            setConfirmarSenha(e.target.value)
        }
    
        function updatedModel(e: ChangeEvent<HTMLInputElement>){
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }
        async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
            e.preventDefault()
//verifica se os campos senha e confirmarSenha são iguais  
            if(confirmarSenha == user.senha){
                cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
                alert('Usuário cadastrado com sucesso!')
            }
            else {
                alert('Dados inconsistentes. Por favor, verifique as informações do cadastro.')
            }
        }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={ 6 } className='imagem2'></Grid>
            <Grid item xs={ 6 } alignItems='center'>
                <Box paddingX={ 20 }>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>
                        <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth></TextField>
                        <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth></TextField>
                        <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth></TextField>
                        <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='confirmarSenha' variant='outlined' name='senha' margin='normal' type='password' fullWidth></TextField>

                        <Box marginTop = { 2 } textAlign='center'>
                            <Link to='/login' className='text-decorator-none' >
                                <Button variant='contained' color='secondary' className='btnCancelar'>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type='submit' variant='contained' color='primary'>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>

        </Grid>
    );
}

export default CadastroUsuario;