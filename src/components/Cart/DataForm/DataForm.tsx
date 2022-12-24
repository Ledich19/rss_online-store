import './DataForm.scss'
import { useState } from 'react'
import visa from '../../../images/pay-siatem/visa.png'
import mastercard from '../../../images/pay-siatem/mastercard.png'
import maestro from '../../../images/pay-siatem/maestro.png'
import jsb from '../../../images/pay-siatem/jcb.png'
import { useAppDispatch } from '../../../app/hooks'
import { setIsOpenForm, setOpenOrderFinish } from '../../../reducers/modalsReducer'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../../../reducers/cartReducer'
import { clearPromocode } from '../../../reducers/promoReducer'

const DataForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [isDirty, setIsDirty] = useState(false)

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [postCode, setPostCode] = useState('')
  const [address, setAddress] = useState('')

  const [nameError, setNameError] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [addressError, setAddressError] = useState('')

  const [cardNum, setCardNum] = useState('')
  const [cardValid, setCardValid] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  const [cardNumError, setCardNumError] = useState('')
  const [cardValidError, setCardValidError] = useState('')
  const [cardCvvError, setCardCvvError] = useState('')

  let card = ''
  if (cardNum[0] <= '2') {
    card = visa
  } else if (cardNum[0] <= '5') {
    card = mastercard
  } else if (cardNum[0] <= '7') {
    card = maestro
  } else if (cardNum[0] <= '9') {
    card = jsb
  }

  const nameValidate = (name: string) => {
    const nameArr = name.split(' ')
    if (name === undefined) {
      setNameError('must be filled')
      return false
    } else if (nameArr.length < 2) {
      setNameError('must have at least two words')
      return false
    } else if (!nameArr.every((name) => name.length > 2)) {
      setNameError('must be longer than three characters')
      return false
    }
    setNameError('')
    return true
  }
  const emailValidate = (email: string) => {
    const re =
      /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!re.test(email) || email === undefined) {
      setEmailError('incorrect email')
      return false
    }
    setEmailError('')
    return true
  }
  const numberValidate = (phoneNumber: string) => {
    if (phoneNumber === undefined || phoneNumber.length === 0) {
      setPhoneNumberError('must be filled')
      return false
    } else if (phoneNumber[0] !== '+') {
      setPhoneNumberError('must start with +')
      return false
    } else if (phoneNumber.length < 10) {
      setPhoneNumberError('must be at least 9 characters')
      return false
    }
    setPhoneNumberError('')
    return true
  }
  const addressValidate = (address: string) => {
    const addressArr = address.split(' ')
    if (address === undefined || address.length === 0) {
      setAddressError('must be filled')
      return false
    } else if (addressArr.length < 3) {
      setAddressError('must have at least three words')
      return false
    } else if (!addressArr.every((word) => word.length > 4)) {
      setAddressError('length of each is at least 5 characters')
      return false
    }
    setAddressError('')
    return true
  }
  const cardNumberValidate = (cardNum: string) => {

    if (cardNum === undefined || cardNum.length === 0) {
      setCardNumError('number: must be filled')
      return false
    } else if (cardNum.length < 16) {
      setCardNumError('number: incorrect card number')
      return false
    }
    setCardNumError('')
    return true
  }
  const cardValidValidate = (cardValid: string) => {
    const cardValidArr = cardValid.split('/')
    if (cardValid === undefined || cardValid.length === 0) {
      setCardValidError('valid: must be filled')
      return false
    } else if (parseInt(cardValidArr[0]) > 12) {
      setCardValidError('valid: month cannot be more than 12')
      return false
    }
    setCardValidError('')
    return true
  }
  const cardCvvValidate = (cardCvv: string) => {
    if (cardCvv === undefined || cardCvv.length === 0) {
      setCardCvvError('cvv: must be filled')
      return false
    } else if (cardCvv.length < 3) {
      setCardCvvError('cvv: must have at least three words')
      return false
    }
    setCardCvvError('')
    return true
  }

  const handleCartNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    if (value.length <= 16) {
      setCardNum(value)
    }
    if (isDirty) {
      cardNumberValidate(value)
    }
  }
  const handleCartValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let value = e.target.value
    if (
      !Number.isNaN(parseInt(value[value.length - 1], 10)) ||
      value[value.length - 1] === '/' ||
      value[value.length - 1] === undefined
    ) {
      if (cardValid.length === 1 && cardValid.length < value.length) {
        value = `${e.target.value}/`
      }
      setCardValid(value)
    }
    if (isDirty) {
      cardValidValidate(value)
    }
  }
  const handleCartCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    if (value.length <= 3) {
      setCardCvv(value)
    }
    if (isDirty) {
      cardCvvValidate(value)
    }
  }
  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    setName(value)
    if (isDirty) {
      nameValidate(value)
    }
  }
  const phoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    if (
      !Number.isNaN(parseInt(value[value.length - 1], 10)) ||
      value[value.length - 1] === '+' ||
      value[value.length - 1] === undefined
    ) {
      setPhoneNumber(value)
    }
    if (isDirty) {
      numberValidate(value)
    }
  }
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    setEmail(value)
    if (isDirty) {
      emailValidate(value)
    }
  }
  const postCodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    setPostCode(value)
  }
  const addressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    setAddress(value)
    if (isDirty) {
      addressValidate(value)
    }
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    setIsDirty(true)

    if (
      nameValidate(phoneNumber) ||
      emailValidate(email) ||
      numberValidate(phoneNumber) ||
      addressValidate(address) ||
      cardNumberValidate(cardNum) ||
      cardValidValidate(cardValid) ||
      cardCvvValidate(cardCvv)
    ) {
      dispatch(setOpenOrderFinish(true))
      window.setTimeout(() => {
        dispatch(setIsOpenForm(false))
        dispatch(setOpenOrderFinish(false))
        setIsDirty(false)
        dispatch(clearCart())
        navigate('/store')
        clearPromocode()
      }, 5000)

     window.localStorage.removeItem('shoppingCartContents')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="order">
      <div className="order__address">
        <label className="order__label order__label_wide" htmlFor="">
          {nameError && <div className="order__valid-error">{nameError}</div>}
          <input
            value={name}
            onChange={nameHandler}
            className="order__address-item "
            type="text"
            placeholder="Name"
          />
        </label>
        <label className="order__label order__label_wide" htmlFor="">
        {emailError && <div className="order__valid-error">{emailError}</div>}
        <input
          value={email}
          onChange={emailHandler}
          className="order__address-item"
          type="email"
          placeholder="Email"
        />

        </label>
        <label className="order__label" htmlFor="">
          
        {phoneNumberError && <div className="order__valid-error">{phoneNumberError}</div>}
        <input
          value={phoneNumber}
          onChange={phoneNumberHandler}
          className="order__address-item"
          type="tel"
          placeholder="Phone Number"
        />
          </label>
          <label className="order__label" htmlFor="">
          
        <input
          value={postCode}
          onChange={postCodeHandler}
          className="order__address-item"
          type="number"
          placeholder="Postcode"
        />
          </label>
          <label className="order__label order__label_wide" htmlFor="">
          
        {addressError && <div className="order__valid-error">{addressError}</div>}
        <input
          value={address}
          onChange={addressHandler}
          className="order__address-item"
          type="text"
          placeholder="Address"
        />
          </label>
      </div>

      <div className="order__card card" style={{ backgroundImage: `url(${card})` }}>
      <label className="order__label card__card-number-label" htmlFor="">
          
        <input
          onChange={handleCartNumber}
          value={cardNum}
          type="number"
          className="card__number"
          placeholder="number"
          ></input>
          </label>

        <div className="card__box">
        <label className="order__label card__card-valid-label" htmlFor="">
          
          <input
          maxLength={5}
          onChange={handleCartValid}
          value={cardValid}
          type="text"
          className="card__valid"
          placeholder="valid"
          ></input>
          </label>
          <label className="order__label card__card-cvv-label" htmlFor="">
          

          <input
            onChange={handleCartCvv}
            value={cardCvv}
            type="number"
            className="card__cv"
            placeholder="cvv"
            ></input>
          </label>
        </div>
            {cardNumError && <div className="card__valid-error">{cardNumError}</div>}
          {cardValidError && <div className="card__valid-error">{cardValidError}</div>}
            {cardCvvError && <div className="card__valid-error">{cardCvvError}</div>}
      </div>
      <button className="order__btn">Order</button>
    </form>
  )
}

export default DataForm
