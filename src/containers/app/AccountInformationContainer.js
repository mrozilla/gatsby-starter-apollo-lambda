// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
  Form,
  Input,
  H1,
  Menu,
  Button,
  Icon,
  H2,
  P,
  Text,
  Modal,
  Section,
  TextLoader,
  AppError,
} from '~components';
import { cardCSS, useInputs } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function AccountInformationContainer() {
  const [inputs, handleInput, setInputs] = useInputs({
    firstName:   '',
    lastName:    '',
    username:    '',
    email:       '',
    password:    __DEV__ ? '12341234' : '',
    newPassword: __DEV__ ? '' : '',
  });
  const [modal, setModal] = useState('');
  const { t } = useTranslation();

  const { data = {}, loading } = useQuery(gql`
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

  useEffect(() => {
    const { __typename, ...rest } = data.me || {}; // __typename returned even if not part of query
    setInputs((prev) => ({ ...prev, ...rest }));
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await mutate({ variables: { inputs } });
      setModal('');
    } catch (err) {
      console.warn({ ...err }); // eslint-disable-line no-console
    }
  };

  const Skeleton = () => (
    <>
      <TextLoader>Firstname Lastname</TextLoader>
      <TextLoader>Username</TextLoader>
      <TextLoader>Email</TextLoader>
      <TextLoader>Password</TextLoader>
    </>
  );

  const Account = () => (
    <>
      <P
        css={`
          display: flex;
        `}
      >
        <Text
          css={`
            font-weight: 700;
          `}
        >
          {data?.me?.firstName} {data?.me?.lastName}
        </Text>
        <Button
          title="Change name"
          css={`
            opacity: 0.5;
            padding: 0.875rem;
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
      <P
        css={`
          display: flex;
        `}
      >
        <Text>{data?.me?.username}</Text>
        <Button
          title="Change username"
          css={`
            opacity: 0.5;
            padding: 0.875rem;
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
      <P
        css={`
          display: flex;
        `}
      >
        <Text
          css={`
            display: inline-block;
          `}
        >
          {data?.me?.email}
        </Text>
        <Button
          title="Change email"
          css={`
            opacity: 0.5;
            padding: 0.875rem;
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
      <P
        css={`
          display: flex;
        `}
      >
        <Text>••••••••</Text>
        <Button
          title="Change password"
          css={`
            opacity: 0.5;
            padding: 0.875rem;
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
    </>
  );

  return (
    <Section
      css={`
        ${cardCSS}
        margin: 0 0 4rem;
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
        {t('settings.account.title')}
      </H2>
      {loading && <Skeleton />}
      {data?.me && <Account />}

      <Modal isOpen={modal !== ''} onClose={handleCloseModal}>
        <H1
          css={`
            font-weight: 700;
            font-size: 2.5rem;
            margin: 0 0 2rem;
          `}
        >
          {t('settings.account.form.title', { modal })}
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
              'buttons buttons'
              / 1fr 1fr;
          `}
          onSubmit={handleSubmit}
        >
          {modal === 'name' && (
            <>
              <Input
                type="text"
                name="firstName"
                label={t('settings.account.form.input.firstName.label')}
                placeholder={t('settings.account.form.input.firstName.placeholder')}
                error={t('settings.account.form.input.firstName.error')}
                autoFocus={!__DEV__}
                required
                value={inputs.firstName}
                onChange={handleInput}
              />
              <Input
                type="text"
                name="lastName"
                label={t('settings.account.form.input.lastName.label')}
                placeholder={t('settings.account.form.input.lastName.placeholder')}
                value={inputs.lastName}
                onChange={handleInput}
              />
            </>
          )}
          {modal === 'username' && (
            <Input
              type="text"
              name="username"
              label={t('settings.account.form.input.username.label')}
              placeholder={t('settings.account.form.input.username.placeholder')}
              description={t('settings.account.form.input.username.description')}
              error={t('settings.account.form.input.username.error')}
              pattern="^\w{4,}$"
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
                {t('settings.account.form.input.email.extra', { email: data?.me?.email })}
              </P>
              <Input
                type="email"
                name="email"
                label={t('settings.account.form.input.email.label')}
                placeholder={t('settings.account.form.input.email.placeholder')}
                error={t('settings.account.form.input.email.error')}
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
              label={t('settings.account.form.input.newPassword.label')}
              placeholder={t('settings.account.form.input.newPassword.placeholder')}
              error={t('settings.account.form.input.newPassword.error')}
              pattern="^\S{8,}$"
              required
              value={inputs.newPassword}
              onChange={handleInput}
            />
          )}
          <Input
            type="password"
            name="password"
            label={t('settings.account.form.input.password.label')}
            placeholder={t('settings.account.form.input.password.placeholder')}
            error={t('settings.account.form.input.password.error')}
            pattern="^\S{8,}$"
            required
            value={inputs.password}
            onChange={handleInput}
          />
          <Menu
            css={`
              grid-area: buttons;
              grid-auto-flow: column;
              justify-content: end;
            `}
          >
            <Button look="tertiary" onClick={handleCloseModal}>
              {t('settings.account.form.button.cancel')}
            </Button>
            <Button type="submit" look="primary" disabled={mLoading} loading={mLoading}>
              {t('settings.account.form.button.submit')}
            </Button>
          </Menu>
          <AppError
            error={error}
            errorMessages={{
              400: 'Fill in all fields',
            }}
          />
        </Form>
      </Modal>
    </Section>
  );
}
