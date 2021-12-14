import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Button, Box, Card, CardContent, Typography, TextField, FormControl, FormControlLabel, FormHelperText, Select, MenuItem, Checkbox, Divider, CardMedia, RadioGroup, Radio } from '@mui/material'
import { IoArrowBack } from 'react-icons/io5'
import axios from 'axios'
import { EMAIL_REGEX } from './../utils/constants'
import { GlobalContext } from './../contexts/GlobalContext'
import CheckoutHeader from './../components/CheckoutHeader'
import Toast from './../components/Toast'

const Checkout = () => {
  const { state } = useContext(GlobalContext)
  const [toastMessage, setToastMessage] = useState('')
  const [email, setEmail] = useState('')
  const [useShippingAddress, setUseShippingAddress] = useState(true)
  const [editShippingAddress, setEditShippingAddress] = useState(true)
  const [editInvoiceAddress, setEditInvoiceAddress] = useState(false)
  const [shippingAddress, setShippingAddress] = useState()
  const [invoiceAddress, setInvoiceAddress] = useState()
  const [invalidInput, setInvalidInput] = useState({shipping: [], invoice: []})
  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  const handleCreateOrder = () => {
    if (email === '' || !EMAIL_REGEX.test(email)) {
      setToastMessage('Bitte fülle die richtige Email aus')
      return
    }
    if (!shippingAddress) {
      setToastMessage('Bitte fülle die Lieferadresse aus')
      return
    }
    if (!useShippingAddress && !invoiceAddress) {
      setToastMessage('Bitte fülle die Rechnungsadresse aus')
      return
    }
    if (selectedPaymentMethod === '') {
      setToastMessage('Bitte wähle eine Zahlungsart aus')
      return
    }

    const payload = {
      email: email,
      order: state.carts,
      shippingAddress: shippingAddress,
      invoiceAddress: useShippingAddress ? shippingAddress : invoiceAddress,
      paymentMethod: selectedPaymentMethod
    }

    console.log(payload)
  }

  const handleChangePaymentMethod = (event) => {
    setSelectedPaymentMethod(parseInt(event.target.value))
  }
  
  const handleChangeUserShippingAddress = (event) => {
    setUseShippingAddress(event.target.checked)
    if(!invoiceAddress) setEditInvoiceAddress(true)
  }

  const handleSubmitAddress = (event, type) => {
    event.preventDefault()
    if(type === 'shipping') setEditShippingAddress(false)
    else if(type === 'invoice') setEditInvoiceAddress(false)
  }

  const handleInvalidInput = (event, type, name) =>{
    event.preventDefault()
    setInvalidInput({...invalidInput, [type]: [...invalidInput[type], name]})
  }

  const handleChangeInput = (event, type, name) => {
    setInvalidInput({...invalidInput, [type]: invalidInput[type].filter(input => input !== name)})
    if(type === 'shipping') setShippingAddress({...shippingAddress, [name]: event.target.value})
    else if(type === 'invoice') setInvoiceAddress({...invoiceAddress, [name]: event.target.value})
  }

  const handleEditAddress = (type) => {
    if(type === 'shipping') setEditShippingAddress(true)
    else if(type === 'invoice') setEditInvoiceAddress(true)
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleToastClose = () => {
    setToastMessage('')
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/payments/methods').then(response => setPaymentMethods(response.data))
  }, [])

  return (
    <>
      <CheckoutHeader />
      <Container maxWidth='lg'>
        <Grid container spacing={4} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} md={8}>
            <Card raised sx={{ marginTop: 1, marginBottom: 1}}>
              <Link to={{ pathname: `/cart` }} style={{ textDecoration: 'unset' }} >
                <Button variant='contained' size='large' fullWidth startIcon={<IoArrowBack/>} sx={{ fontWeight: 600, textTransform: 'capitalize', color: '#FFFFFF', backgroundColor: '#000000', '&:hover': {color: '#FFFFFF', backgroundColor: '#212121'} }}>
                  Zurück zum Warenkorb
                </Button>
              </Link>
            </Card>
            <Card raised sx={{ marginTop: 1, marginBottom: 1}}>
              <CardContent>
                <Typography variant='subtitle1' sx={{ fontWeight: 600, marginBottom: 3 }}>
                  1. Kundeninfo
                </Typography>
                <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                  Email
                </Typography>
                <TextField
                  variant='outlined'
                  fullWidth
                  onChange={handleChangeEmail}
                />
              </CardContent>
            </Card>
            <Card raised sx={{ marginTop: 1, marginBottom: 1}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                    2. Lieferadresse
                  </Typography>
                  {!editShippingAddress &&
                    <Button color='inherit' sx={{ fontWeight: 600, textTransform: 'capitalize' }} onClick={() => handleEditAddress('shipping')}>
                      Bearbeiten
                    </Button>
                  }
                </Box>
                {!editShippingAddress &&
                  <>
                    <Typography variant='subtitle1'>
                      {shippingAddress?.salutation === 'mr' ? 'Herr' : shippingAddress?.salutation === 'mrs' ? 'Frau' : ''} {shippingAddress?.firstName} {shippingAddress?.lastName}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {shippingAddress?.street} {shippingAddress?.houseNumber}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {shippingAddress?.additionalAddress}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {shippingAddress?.postcode} {shippingAddress?.city}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {shippingAddress?.phoneNumber}
                    </Typography>
                  </>
                }
                {editShippingAddress &&
                  <form onSubmit={(e) => handleSubmitAddress(e, 'shipping')}>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                        Anrede
                      </Typography>
                      <FormControl fullWidth required error={invalidInput.shipping.includes('salutation')}>
                        <Select
                          displayEmpty
                          value={shippingAddress?.salutation ?? ''}
                          onChange={(e) => handleChangeInput(e, 'shipping', 'salutation')}
                          onInvalid={(e) => handleInvalidInput(e, 'shipping', 'salutation')}
                        >
                          <MenuItem value=''>Bitte auswählen</MenuItem>
                          <MenuItem value='mr'>Herr</MenuItem>
                          <MenuItem value='mrs'>Frau</MenuItem>
                        </Select>
                        {invalidInput.shipping.includes('salutation') &&  
                          <FormHelperText>Bitte gib eine Anrede ein.</FormHelperText>
                        }
                      </FormControl>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                        Vorname
                      </Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={shippingAddress?.firstName ?? ''}
                        onChange={(e) => handleChangeInput(e, 'shipping', 'firstName')}
                        onInvalid={(e) => handleInvalidInput(e, 'shipping', 'firstName')}
                        required
                        error={invalidInput.shipping.includes('firstName')}
                        helperText={invalidInput.shipping.includes('firstName') ? 'Der Vorname ist ein Pflichtfeld.' : ''}
                      />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                        Nachname
                      </Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={shippingAddress?.lastName ?? ''}
                        onChange={(e) => handleChangeInput(e, 'shipping', 'lastName')}
                        onInvalid={(e) => handleInvalidInput(e, 'shipping', 'lastName')}
                        required
                        error={invalidInput.shipping.includes('lastName')}
                        helperText={invalidInput.shipping.includes('lastName') ? 'Der Nachname ist ein Pflichtfeld.' : ''}
                      />
                    </Box>
                    <Box sx={{ marginBottom: 2, display: 'flex', gap: 1 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                          Straße
                        </Typography>
                        <TextField
                          variant='outlined'
                          fullWidth
                          value={shippingAddress?.street ?? ''}
                          onChange={(e) => handleChangeInput(e, 'shipping', 'street')}
                          onInvalid={(e) => handleInvalidInput(e, 'shipping', 'street')}
                          required
                          error={invalidInput.shipping.includes('street')}
                          helperText={invalidInput.shipping.includes('street') ? 'Die Straße ist ein Pflichtfeld.' : ''}
                        />
                      </Box>
                      <Box sx={{ flexShrink: 1 }}>
                        <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                          Hausnummer
                        </Typography>
                        <TextField
                          variant='outlined'
                          fullWidth
                          value={shippingAddress?.houseNumber ?? ''}
                          onChange={(e) => handleChangeInput(e, 'shipping', 'houseNumber')}
                          onInvalid={(e) => handleInvalidInput(e, 'shipping', 'houseNumber')}
                          required
                          error={invalidInput.shipping.includes('houseNumber')}
                          helperText={invalidInput.shipping.includes('houseNumber') ? 'Die Hausnummer ist ein Pflichtfeld.' : ''}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                        Adresszusatz/Firma (optional)
                      </Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={shippingAddress?.additionalAddress ?? ''}
                        onChange={(e) => handleChangeInput(e, 'shipping', 'additionalAddress')}
                      />
                    </Box>
                    <Box sx={{ marginBottom: 2, display: 'flex', gap: 1 }}>
                      <Box sx={{ flexShrink: 1 }}>
                        <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                          PLZ
                        </Typography>
                        <TextField
                          variant='outlined'
                          fullWidth
                          value={shippingAddress?.postcode ?? ''}
                          onChange={(e) => handleChangeInput(e, 'shipping', 'postcode')}
                          onInvalid={(e) => handleInvalidInput(e, 'shipping', 'postcode')}
                          required
                          error={invalidInput.shipping.includes('postcode')}
                          helperText={invalidInput.shipping.includes('postcode') ? 'Die Postleitzahl ist ein Pflichtfeld.' : ''}
                        />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                          Stadt
                        </Typography>
                        <TextField
                          variant='outlined'
                          fullWidth
                          value={shippingAddress?.city ?? ''}
                          onChange={(e) => handleChangeInput(e, 'shipping', 'city')}
                          onInvalid={(e) => handleInvalidInput(e, 'shipping', 'city')}
                          required
                          error={invalidInput.shipping.includes('city')}
                          helperText={invalidInput.shipping.includes('city') ? 'Die Stadt ist ein Pflichtfeld.' : ''}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                        Telefonnummer (optional)
                      </Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={shippingAddress?.phoneNumber ?? ''}
                        onChange={(e) => handleChangeInput(e, 'shipping', 'phoneNumber')}
                      />
                    </Box>
                    <Button variant='contained' size='large' fullWidth type='submit' sx={{ fontWeight: 600, textTransform: 'capitalize', color: '#FFFFFF', backgroundColor: '#000000', '&:hover': {color: '#FFFFFF', backgroundColor: '#212121'} }}>
                      Adresse speichern
                    </Button>
                  </form>
                }
              </CardContent>
            </Card>
            <Card raised sx={{ marginTop: 1, marginBottom: 1}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                    3. Rechnungsadresse
                  </Typography>
                  {!useShippingAddress && !editInvoiceAddress &&
                    <Button color='inherit' sx={{ fontWeight: 600, textTransform: 'capitalize' }} onClick={() => handleEditAddress('invoice')}>
                      Bearbeiten
                    </Button>
                  }
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked onChange={handleChangeUserShippingAddress} />
                  }
                  label='Lieferadresse verwenden'
                  sx={{ marginBottom: 2 }}
                />
                {!useShippingAddress && !editInvoiceAddress &&
                  <>
                    <Typography variant='subtitle1'>
                      {invoiceAddress?.salutation === 'mr' ? 'Herr' : invoiceAddress?.salutation === 'mrs' ? 'Frau' : ''} {invoiceAddress?.firstName} {invoiceAddress?.lastName}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {invoiceAddress?.street} {invoiceAddress?.houseNumber}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {invoiceAddress?.additionalAddress}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {invoiceAddress?.postcode} {invoiceAddress?.city}
                    </Typography>
                    <Typography variant='subtitle1'>
                      {invoiceAddress?.phoneNumber}
                    </Typography>
                  </>
                }
                {!useShippingAddress && editInvoiceAddress &&
                  <form onSubmit={(e) => handleSubmitAddress(e, 'invoice')}>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                        Anrede
                      </Typography>
                      <FormControl fullWidth required error={invalidInput.invoice.includes('salutation')}>
                        <Select
                          displayEmpty
                          value={invoiceAddress?.salutation ?? ''}
                          onChange={(e) => handleChangeInput(e, 'invoice', 'salutation')}
                          onInvalid={(e) => handleInvalidInput(e, 'invoice', 'salutation')}
                        >
                          <MenuItem value=''>Bitte auswählen</MenuItem>
                          <MenuItem value='mr'>Herr</MenuItem>
                          <MenuItem value='mrs'>Frau</MenuItem>
                        </Select>
                        {invalidInput.invoice.includes('salutation') &&  
                          <FormHelperText>Bitte gib eine Anrede ein.</FormHelperText>
                        }
                      </FormControl>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                        Vorname
                      </Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={invoiceAddress?.firstName ?? ''}
                        onChange={(e) => handleChangeInput(e, 'invoice', 'firstName')}
                        onInvalid={(e) => handleInvalidInput(e, 'invoice', 'firstName')}
                        required
                        error={invalidInput.invoice.includes('firstName')}
                        helperText={invalidInput.invoice.includes('firstName') ? 'Der Vorname ist ein Pflichtfeld.' : ''}
                      />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                        Nachname
                      </Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={invoiceAddress?.lastName ?? ''}
                        onChange={(e) => handleChangeInput(e, 'invoice', 'lastName')}
                        onInvalid={(e) => handleInvalidInput(e, 'invoice', 'lastName')}
                        required
                        error={invalidInput.invoice.includes('lastName')}
                        helperText={invalidInput.invoice.includes('lastName') ? 'Der Nachname ist ein Pflichtfeld.' : ''}
                      />
                    </Box>
                    <Box sx={{ marginBottom: 2, display: 'flex', gap: 1 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                          Straße
                        </Typography>
                        <TextField
                          variant='outlined'
                          fullWidth
                          value={invoiceAddress?.street ?? ''}
                          onChange={(e) => handleChangeInput(e, 'invoice', 'street')}
                          onInvalid={(e) => handleInvalidInput(e, 'invoice', 'street')}
                          required
                          error={invalidInput.invoice.includes('street')}
                          helperText={invalidInput.invoice.includes('street') ? 'Die Straße ist ein Pflichtfeld.' : ''}
                        />
                      </Box>
                      <Box sx={{ flexShrink: 1 }}>
                        <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                          Hausnummer
                        </Typography>
                        <TextField
                          variant='outlined'
                          fullWidth
                          value={invoiceAddress?.houseNumber ?? ''}
                          onChange={(e) => handleChangeInput(e, 'invoice', 'houseNumber')}
                          onInvalid={(e) => handleInvalidInput(e, 'invoice', 'houseNumber')}
                          required
                          error={invalidInput.invoice.includes('houseNumber')}
                          helperText={invalidInput.invoice.includes('houseNumber') ? 'Die Hausnummer ist ein Pflichtfeld.' : ''}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                        Adresszusatz/Firma (optional)
                      </Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={invoiceAddress?.additionalAddress ?? ''}
                        onChange={(e) => handleChangeInput(e, 'invoice', 'additionalAddress')}
                      />
                    </Box>
                    <Box sx={{ marginBottom: 2, display: 'flex', gap: 1 }}>
                      <Box sx={{ flexShrink: 1 }}>
                        <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                          PLZ
                        </Typography>
                        <TextField
                          variant='outlined'
                          fullWidth
                          value={invoiceAddress?.postcode ?? ''}
                          onChange={(e) => handleChangeInput(e, 'invoice', 'postcode')}
                          onInvalid={(e) => handleInvalidInput(e, 'invoice', 'postcode')}
                          required
                          error={invalidInput.invoice.includes('postcode')}
                          helperText={invalidInput.invoice.includes('postcode') ? 'Die Postleitzahl ist ein Pflichtfeld.' : ''}
                        />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                          Stadt
                        </Typography>
                        <TextField
                          variant='outlined'
                          fullWidth
                          value={invoiceAddress?.city ?? ''}
                          onChange={(e) => handleChangeInput(e, 'invoice', 'city')}
                          onInvalid={(e) => handleInvalidInput(e, 'invoice', 'city')}
                          required
                          error={invalidInput.invoice.includes('city')}
                          helperText={invalidInput.invoice.includes('city') ? 'Die Stadt ist ein Pflichtfeld.' : ''}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant='subtitle1' sx={{ marginBottom: 0.5 }}>
                        Telefonnummer (optional)
                      </Typography>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={invoiceAddress?.phoneNumber ?? ''}
                        onChange={(e) => handleChangeInput(e, 'invoice', 'phoneNumber')}
                      />
                    </Box>
                    <Button variant='contained' size='large' fullWidth type='submit' sx={{ fontWeight: 600, textTransform: 'capitalize', color: '#FFFFFF', backgroundColor: '#000000', '&:hover': {color: '#FFFFFF', backgroundColor: '#212121'} }}>
                      Adresse speichern
                    </Button>
                  </form>
                }
              </CardContent>
            </Card>
            <Card raised sx={{ marginTop: 1, marginBottom: 1}}>
              <CardContent>
                <Typography variant='subtitle1' sx={{ fontWeight: 600, marginBottom: 3 }}>
                  4. Zahlungsarten
                </Typography>
                <FormControl component='fieldset' fullWidth required >
                  <RadioGroup value={selectedPaymentMethod} onChange={handleChangePaymentMethod} sx={{ gap: 1 }}>
                    {paymentMethods.map((method, index) => (
                      <FormControlLabel
                        key={index}
                        disableTypography
                        value={method.id}
                        control={<Radio sx={{ color: '#000000', '&.Mui-checked': { color: '#212121' } }} />}
                        label={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography variant='subtitle1'>
                                {method.name}
                              </Typography>
                              <Typography variant='subtitle2' color='text.secondary'>
                                {method.description}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CardMedia
                                component='img'
                                alt={method.name}
                                image={method.image}
                              />
                            </Box>
                          </Box>
                        }
                        sx={{ width: '100%', gap: 2 }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
            <Card raised sx={{ marginTop: 1, marginBottom: 1}}>
              <CardContent>
                <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={12} sm={6}>
                    <Button variant='contained' size='large' fullWidth onClick={handleCreateOrder} sx={{ fontWeight: 600, textTransform: 'capitalize', color: '#FFFFFF', backgroundColor: '#000000', '&:hover': {color: '#FFFFFF', backgroundColor: '#212121'} }}>
                      Bezahlen
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start'} }}>
                    <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                      Gesamt {state.carts.total} €
                    </Typography>
                    <Typography variant='subtitle2' color='text.secondary'>
                      inkl. Mwst.
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card raised sx={{ marginTop: 1, marginBottom: 1}}>
              <CardContent>
                <Typography variant='subtitle1' sx={{ fontWeight: 600, marginBottom: 2 }}>
                  Bestellübersicht
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                  <Typography variant='subtitle1'>
                    Zwischensumme:
                  </Typography>
                  <Typography variant='subtitle1'>
                    {state.carts.subtotal.toFixed(2)} €
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle1'>
                      Versandkosten:
                    </Typography>
                    <Typography variant='subtitle1' color='inherit'>
                      {state.carts.shippingCost > 0 ? state.carts.shippingCost.toFixed(2) : 0.00} €
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                <Box sx={{ marginBottom: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                      Gesamt:
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                      {state.carts.total.toFixed(2)} €
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                {state.carts.items.map((item, index) => (
                  <Grid container key={index} sx={{ marginBottom: 2 }}>
                    <Grid item xs={4}>
                      <CardMedia
                        component='img'
                        alt={`${item?.brand_name} ${item?.name}`}
                        image={item?.image}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Box sx={{ marginBottom: 2 }}>
                        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                          {item.brand_name}
                        </Typography>
                        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        <Typography variant='subtitle2' color='text.secondary'>
                          {item.type_name} {item.variant.size} ml
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant='subtitle2' color='text.secondary'>
                            Menge: {item.quantity}
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            {item.variant.discount_percentage !== 0 &&
                              <>
                                <Typography variant='subtitle2' sx={{ textDecoration: 'line-through', marginBottom: 0.5 }}>
                                  {item.variant.original_price.toFixed(2)} €
                                </Typography>
                                <Typography variant='subtitle1' sx={{ fontWeight: 600, color: '#C74E4D' }}>
                                  - {item.variant.discount_percentage}% | {item.variant.price.toFixed(2)} €
                                </Typography>
                              </>
                            }
                            {item.variant.discount_percentage === 0 &&
                              <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                                {item.variant.price.toFixed(2)} €
                            </Typography>
                            }
                            <Typography variant='caption' color='text.secondary'>
                              {item.variant.base_price.toFixed(2)} € / {item.variant.base_size} ml
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Toast message={toastMessage} type='error' handleToastClose={handleToastClose} />
    </>
  )
}

export default Checkout