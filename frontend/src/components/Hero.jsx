import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaBoxOpen, FaChartLine, FaUserLock } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className='py-5' style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Container>
        <div className='d-flex flex-column align-items-center text-center'>
          <h1 className='display-4 fw-bold mb-4' style={{ color: '#2c3e50' }}>
            Gestión Inteligente de Inventario
          </h1>
          <p className='lead mb-5' style={{ maxWidth: '800px', color: '#34495e' }}>
            Optimiza tu negocio con nuestro sistema avanzado de gestión de productos.
            Controla tu inventario en tiempo real y toma decisiones informadas.
          </p>

          <div className='row w-100 mb-5'>
            <div className='col-md-4 mb-4'>
              <Card className='h-100 shadow-sm border-0 py-4'>
                <Card.Body>
                  <FaBoxOpen size={40} className='text-primary mb-3' />
                  <h3 className='h5'>Control Total</h3>
                  <p className='text-muted'>Gestiona tu inventario con facilidad y precisión</p>
                </Card.Body>
              </Card>
            </div>
            <div className='col-md-4 mb-4'>
              <Card className='h-100 shadow-sm border-0 py-4'>
                <Card.Body>
                  <FaChartLine size={40} className='text-primary mb-3' />
                  <h3 className='h5'>Análisis en Tiempo Real</h3>
                  <p className='text-muted'>Visualiza el rendimiento de tus productos</p>
                </Card.Body>
              </Card>
            </div>
            <div className='col-md-4 mb-4'>
              <Card className='h-100 shadow-sm border-0 py-4'>
                <Card.Body>
                  <FaUserLock size={40} className='text-primary mb-3' />
                  <h3 className='h5'>Seguridad Garantizada</h3>
                  <p className='text-muted'>Tu información siempre protegida</p>
                </Card.Body>
              </Card>
            </div>
          </div>

          <Card className='border-0 shadow-lg p-5 bg-white' style={{ borderRadius: '20px', width: '100%', maxWidth: '800px' }}>
            <Card.Body className='text-center'>
              <h2 className='mb-4'>Comienza Ahora</h2>
              <p className='text-muted mb-4'>
                Únete a cientos de empresas que ya optimizan su inventario con nuestra plataforma
              </p>
              <div className='d-flex justify-content-center gap-3'>
                <LinkContainer to='/login'>
                  <Button size='lg' variant='primary' className='px-4 shadow-sm'>
                    Iniciar Sesión
                  </Button>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <Button size='lg' variant='outline-primary' className='px-4'>
                    Crear Cuenta
                  </Button>
                </LinkContainer>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Hero;