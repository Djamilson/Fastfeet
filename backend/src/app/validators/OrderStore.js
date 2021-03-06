import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      product: Yup.string().required('A descrição do produto é obrigatório!'),
      observation: Yup.string(),
      person: Yup.object().shape({
        deliveryman_id:  Yup.number().required(),
        recipient_id: Yup.number().required(),
      }),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
