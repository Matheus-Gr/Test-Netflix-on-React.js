import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer'; 
import categoriasRepository from '../../repositories/categorias';
import '../../pages/cadastro/categoria/categoria.css';
import face from '../../assets/img/willsmith.png';


function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);
  
    useEffect(() => {
      setTimeout( () => {
      categoriasRepository.getAllWithVideos()
        .then((categoriasComVideos) => {
          console.log(categoriasComVideos[0].videos[0]);
          setDadosIniciais(categoriasComVideos);
        })
        .catch((err) => {
          console.log(err.message);
        });
      }, 2 * 1000);}, [])
  

  return (
    <div style={{ background: '#141414' }}>
      <Menu />

      {dadosIniciais.length === 0 && (
        <div className="foto">
        <img className="image" src={face} alt="willsmith" />
        </div>
      )}

      {dadosIniciais.map((categoria, indice) => {
        if (indice === 0) {
          return (
            <div key={categoria.id}>
              <BannerMain
                videoTitle={dadosIniciais[0].videos[0].titulo}
                url={dadosIniciais[0].videos[0].url}
                videoDescription={dadosIniciais[0].videos[0].description}
              />
              <Carousel
                ignoreFirstVideo
                category={dadosIniciais[0]}
              />
            </div>
          );
        }

        return (
          <Carousel
            key={categoria.id}
            category={categoria}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default Home;