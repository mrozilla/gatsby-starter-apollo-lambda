// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Form, Input, H1, Button, Alert, Icon, H2, P, Text, Modal, Section } from '~components';
import { emptyLoader } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function AccountInformationContainer() {
  const { data = {} } = useQuery(gql`
    {
      me {
        _id
        firstName
        lastName
        username
        email
      }
    }
  `);

  const [inputs, setInputs] = useState({
    firstName:   '',
    lastName:    '',
    username:    '',
    email:       '',
    password:    __DEV__ ? '12341234' : '',
    newPassword: __DEV__ ? '' : '',
  });
  const [modal, setModal] = useState('');

  useEffect(() => {
    const { __typename, ...rest } = data.me || {}; // __typename returned even if not part of query
    setInputs(prev => ({ ...prev, ...rest }));
  }, [data.me]);

  const [mutate, { loading: mLoading, error }] = useMutation(gql`
    mutation($inputs: AccountInput!) {
      updateAccount(accountData: $inputs) {
        _id
        firstName
        lastName
        username
        email
      }
    }
  `);

  const handleCloseModal = () => setModal('');
  const handleInput = ({ target }) => setInputs(prev => ({ ...prev, [target.name]: target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await mutate({ variables: { inputs } });
      setModal('');
    } catch (err) {
      console.warn({ ...err }); // eslint-disable-line no-console
    }
  };

  return (
    <Section
      css={`
        padding: 4rem;
        margin: 0 0 4rem;
        background-color: var(--color-inverse);
        box-shadow: var(--border-box-shadow);
        border-radius: var(--border-radius);
      `}
    >
      <H2
        css={`
          font-weight: 700;
          font-size: 3rem;
          line-height: 4rem;
          margin: 0 0 2rem;
        `}
      >
        Account information
      </H2>
      <P>
        <Text
          css={`
            font-weight: 700;
            display: inline-block;
            ${emptyLoader}
          `}
        >
          {data?.me?.firstName} {data?.me?.lastName}
        </Text>
        <Button
          title="Change name"
          css={`
            font-size: 1.5rem;
            opacity: 0.5;
            padding: 1rem;
          `}
          onClick={() => setModal('name')}
        >
          <Icon
            icon="FaPen"
            css={`
              font-size: 1.25rem;
              margin: 0 0.5rem 0 0;
            `}
          />
        </Button>
      </P>
      <P>
        <Text
          css={`
            display: inline-block;
            ${emptyLoader}
          `}
        >
          {data?.me?.username}
        </Text>
        <Button
          title="Change username"
          css={`
            font-size: 1.5rem;
            opacity: 0.5;
            padding: 1rem;
          `}
          onClick={() => setModal('username')}
        >
          <Icon
            icon="FaPen"
            css={`
              font-size: 1.25rem;
              margin: 0 0.5rem 0 0;
            `}
          />
        </Button>
      </P>
      <P>
        <Text
          css={`
            display: inline-block;
            ${emptyLoader}
          `}
        >
          {data?.me?.email}
        </Text>
        <Button
          title="Change email"
          css={`
            font-size: 1.5rem;
            opacity: 0.5;
            padding: 1rem;
          `}
          onClick={() => setModal('email')}
        >
          <Icon
            icon="FaPen"
            css={`
              font-size: 1.25rem;
              margin: 0 0.5rem 0 0;
            `}
          />
        </Button>
      </P>
      <P>
        <Text>••••••••</Text>
        <Button
          title="Change password"
          css={`
            font-size: 1.5rem;
            opacity: 0.5;
            padding: 1rem;
          `}
          onClick={() => setModal('password')}
        >
          <Icon
            icon="FaPen"
            css={`
              font-size: 1.25rem;
              margin: 0 0.5rem 0 0;
            `}
          />
        </Button>
      </P>

      <Modal
        isOpen={modal !== ''}
        onClickBackground={handleCloseModal}
        onClickClose={handleCloseModal}
        onClickEscape={handleCloseModal}
      >
        <H1
          css={`
            font-weight: 700;
            font-size: 2.5rem;
            margin: 0 0 2rem;
          `}
        >
          Change {modal}
        </H1>
        <Form
          css={`
            max-width: 400px;
            grid-template:
              ${modal === 'name' && "'firstName lastName'"}
              ${modal === 'username' && "'username username'"}
              ${modal === 'email' && "'warning warning' 'email email'"}
              ${modal === 'password' && "'newPassword newPassword'"}
              'password password'
              'cancel submit'
              / 1fr 1fr;
          `}
          onSubmit={handleSubmit}
        >
          {modal === 'name' && (
            <>
              <Input
                type="text"
                name="firstName"
                label="First name"
                placeholder="First name..."
                error="Please add your given name"
                autoFocus={!__DEV__}
                value={inputs.firstName}
                onChange={handleInput}
              />
              <Input
                type="text"
                name="lastName"
                label="Last name"
                placeholder="Last name..."
                error="Please add your family name"
                value={inputs.lastName}
                onChange={handleInput}
              />
            </>
          )}
          {modal === 'username' && (
            <Input
              type="text"
              name="username"
              label="Username"
              placeholder="Choose your username..."
              pattern="^\w{4,}$"
              description="Your username has to be at least 4 characters long"
              error="Your username has to be at least 4 characters long"
              required
              value={inputs.username}
              onChange={handleInput}
            />
          )}
          {modal === 'email' && (
            <>
              <P
                css={`
                  grid-area: warning;
                  margin: 0 0 2rem;
                `}
              >
                Your current email is{' '}
                <Text
                  css={`
                    font-weight: 700;
                  `}
                >
                  {data?.me?.email}
                </Text>
                . Enter a new email and we will send you a verification code.
              </P>
              <Input
                type="email"
                name="email"
                label="New email"
                placeholder="New email..."
                error="Your email has to be in the format of name@domain.com"
                required
                value={inputs.email}
                onChange={handleInput}
              />
            </>
          )}
          {modal === 'password' && (
            <Input
              type="password"
              name="newPassword"
              label="New password"
              placeholder="New password..."
              pattern="^\S{8,}$"
              error="Your password has to be at least 8 characters long"
              required
              value={inputs.newPassword}
              onChange={handleInput}
            />
          )}
          <Input
            type="password"
            name="password"
            label="Current password"
            placeholder="Current password..."
            pattern="^\S{8,}$"
            error="Your password has to be at least 8 characters long"
            required
            value={inputs.password}
            onChange={handleInput}
          />
          <Button
            type="submit"
            look="primary"
            disabled={mLoading}
            css={`
              grid-area: submit;
            `}
          >
            {mLoading ? 'Loading...' : 'Save'}
          </Button>
          <Button
            look="tertiary"
            css={`
              grid-area: cancel;
            `}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          {error && (
            <Alert
              type="danger"
              css={`
                grid-column: 1 / -1;
                margin: 2rem 0 0;
                font-weight: 700;

                display: flex;
                align-items: center;
              `}
            >
              <Icon
                icon="FaExclamationTriangle"
                css={`
                  margin: 0 1rem 0 0;
                `}
              />
              {error.graphQLErrors.map(err => err.message).join(', ')}
            </Alert>
          )}
        </Form>
      </Modal>
    </Section>
  );
}
