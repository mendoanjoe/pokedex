import Link from 'next/link'
import { Container, Row, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Layout from '../components/Layout'

export async function getStaticProps() {
  let pokemon = await fetch('https://pokeapi.co/api/v2/pokemon')
  pokemon = await pokemon.json();

  pokemon = await pokemon.results.map(async item => {
    let data = await fetch(item.url)
    data = await data.json()
    return { ...item, ...data }
  })

  pokemon = await Promise.all(pokemon)

  return {
    props: {
      pokemon: pokemon,
    },
  }
}

function addDataIntoCache(id) {
  if ('caches' in window) {
    caches.open('my-pokemon').then((cache) => {
      if (!cache.match(`https://pokeapi.co/api/v2/pokemon/${id}/`)) {
        cache.add(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      } else {
        cache.delete(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((rs) => {
          cache.add(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        });
      }
    });
  }
}

function Home({ pokemon }) {
  return (
    <Layout>
      <div className="p-5 mb-4 bg-light">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Pokemon Index</h1>
          <p className="col-md-8 fs-4">Data from `pokeapi.co`</p>
          <Link href="/my"><a className="btn btn-primary btn-lg" type="button">My Pokemon</a></Link>
        </div>
      </div>
      <Container>
        <Row className="justify-content-center">
          {pokemon.map((itm) => (
            <Card key={itm.id} style={{ width: '20rem' }} className="m-3">
              <Card.Img variant="top" className="p-2" src={`https://img.pokemondb.net/artwork/large/${itm.name}.jpg`} style={{ height: '10rem', width: '10rem', alignSelf: 'center' }} />
              <Card.Body>
                <Card.Title>{itm.name.toUpperCase()}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Base Experience : {itm.base_experience}</ListGroupItem>
                <ListGroupItem>Weight : {itm.weight}</ListGroupItem>
                <ListGroupItem>Height : {itm.height}</ListGroupItem>
                <ListGroupItem>Abilities : {itm.abilities.map((it, idx) => <span key={idx} className="badge bg-secondary mx-1">{it.ability.name}</span>)}</ListGroupItem>
                <ListGroupItem>Type : {itm.types.map((it, idx) => <span key={idx} className="badge bg-secondary mx-1">{it.type.name}</span>)}</ListGroupItem>
              </ListGroup>
              <Card.Body className="align-self-center">
                <Card.Link href={`/detail/${encodeURIComponent(itm.id)}`}>Detail</Card.Link>
                <Card.Link onClick={() => addDataIntoCache(itm.id, itm)}>Add To My Pokemon</Card.Link>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </Layout>
  )
}

export default Home