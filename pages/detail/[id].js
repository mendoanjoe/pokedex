import Link from 'next/link'
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Layout from '../../components/Layout'

export const getStaticPaths = async () => {

  return {
      paths: [],
      fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
  pokemon = await pokemon.json();

  return {
    props: {
      pokemon: pokemon,
    },
  }
}

function Detail({ pokemon }) {
  return (
    <Layout>
      <div className="p-5 mb-4 bg-light">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Pokemon Index</h1>
          <p className="col-md-8 fs-4">Data from `pokeapi.co`</p>
          <Link href="/"><a className="btn btn-primary btn-lg" type="button">All Pokemon</a></Link>
        </div>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Card className="m-3">
            <Card.Img variant="top" className="p-2" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} style={{ height: '10rem', width: '10rem', alignSelf: 'center'}} />
            <Card.Body>
              <Card.Title>{pokemon.name.toUpperCase()}</Card.Title>
            </Card.Body>
            <Row>
              <Col>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>ID : {pokemon.id}</ListGroupItem>
                  <ListGroupItem>Base Experience : {pokemon.base_experience}</ListGroupItem>
                  <ListGroupItem>Weight : {pokemon.weight}</ListGroupItem>
                  <ListGroupItem>Height : {pokemon.height}</ListGroupItem>
                  <ListGroupItem>Abilities : {pokemon.abilities.map((it, idx) => <span key={idx} className="badge bg-secondary mx-1">{it.ability.name}</span>)}</ListGroupItem>
                  <ListGroupItem>Type : {pokemon.types.map((it, idx) => <span key={idx} className="badge bg-secondary mx-1">{it.type.name}</span>)}</ListGroupItem>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup className="list-group-flush">
                {pokemon.stats.map((itm, idx) => (
                  <ListGroupItem key={idx}>{itm.stat.name.charAt(0).toUpperCase() + itm.stat.name.slice(1)} : {<span className="badge bg-secondary mx-1">{itm.base_stat}</span>}</ListGroupItem>
                ))}
                </ListGroup>
              </Col>
            </Row>
            <Card.Body className="align-self-center">
                <Card.Link href={`/`}>Back</Card.Link>
              </Card.Body>
          </Card>
        </Row>
      </Container>
    </Layout>
  )
}

export default Detail