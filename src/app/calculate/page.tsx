/* eslint-disable no-console */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import client from '@/lib/axiosInstance';
import { ResultContext } from '@/utils/hooks/resultContext';
import { formSchema, formSchemaType } from '@/utils/validations/weightedProduct.schema';

const Calculate = () => {
    const { setResult } = useContext(ResultContext);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<formSchemaType>({
        defaultValues: {
            weights: {
                bottom_out_force: { attribute: 'benefit' },
                actuation_travel: { attribute: 'benefit' },
                total_travel: { attribute: 'benefit' },
                lube_id: { attribute: 'benefit' },
                price: { attribute: 'cost' }
            }
        },
        resolver: zodResolver(formSchema)
    });

    const onSubmit: SubmitHandler<formSchemaType> = async (data) => {
        try {
            const res = await client.post('/api/calculate-weighted-product', data);
            setResult(res.data.data);
            router.push('/calculate/result');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto px-5 pt-16 md:h-screen md:px-[110px] md:pt-20">
            <h1 className="mb-4 text-2xl font-bold md:text-3xl">Kriteria Rekomendasi Switch</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label htmlFor="type" className="text-lg font-medium">
                        Tipe Switch
                    </Label>
                    <Select onValueChange={(value) => setValue('type', Number(value))}>
                        <SelectTrigger className="mt-2 md:w-52" id="type" name="type">
                            <SelectValue placeholder="Pilih Tipe Switch" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Linear</SelectItem>
                            <SelectItem value="2">Tactile</SelectItem>
                            <SelectItem value="3">Clicky</SelectItem>
                            <SelectItem value="4">Silent Linear</SelectItem>
                            <SelectItem value="5">Silent Tactile</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
                </div>
                <div className="mt-4">
                    <h1 className="mb-2 text-lg font-medium">Bobot Kriteria</h1>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                        <div>
                            <Label htmlFor="bottom_out_force">Bottom Out Force</Label>
                            <Input
                                type="number"
                                id="bottom_out_force"
                                {...register('weights.bottom_out_force', {
                                    setValueAs: (value) => ({
                                        value: Number(value),
                                        attribute: 'benefit'
                                    })
                                })}
                                placeholder="1-10"
                            />
                            {errors.weights?.bottom_out_force?.value && (
                                <p className="text-sm text-red-500">{errors.weights.bottom_out_force.value.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="actuation_travel">Actuation Force</Label>
                            <Input
                                type="number"
                                id="actuation_travel"
                                {...register('weights.actuation_travel', {
                                    setValueAs: (value) => ({
                                        value: Number(value),
                                        attribute: 'benefit'
                                    })
                                })}
                                placeholder="1-10"
                            />
                            {errors.weights?.actuation_travel?.value && (
                                <p className="text-sm text-red-500">{errors.weights.actuation_travel.value.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="total_travel">Total Travel</Label>
                            <Input
                                type="number"
                                id="total_travel"
                                {...register('weights.total_travel', {
                                    setValueAs: (value) => ({
                                        value: Number(value),
                                        attribute: 'benefit'
                                    })
                                })}
                                placeholder="1-10"
                            />
                            {errors.weights?.total_travel?.value && (
                                <p className="text-sm text-red-500">{errors.weights.total_travel.value.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="lube_id">Status Lube</Label>
                            <Input
                                type="number"
                                id="lube_id"
                                {...register('weights.lube_id', {
                                    setValueAs: (value) => ({
                                        value: Number(value),
                                        attribute: 'benefit'
                                    })
                                })}
                                placeholder="1-10"
                            />
                            {errors.weights?.lube_id?.value && (
                                <p className="text-sm text-red-500">{errors.weights.lube_id.value.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="price">Harga</Label>
                            <Input
                                type="number"
                                id="price"
                                {...register('weights.price', {
                                    setValueAs: (value) => ({
                                        value: Number(value),
                                        attribute: 'cost'
                                    })
                                })}
                                placeholder="1-10"
                            />
                            {errors.weights?.price?.value && (
                                <p className="text-sm text-red-500">{errors.weights.price.value.message}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h1 className="mb-2 text-lg font-medium">Bobot Sub-Kriteria</h1>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                        <div>
                            <h1>Bottom Out Force</h1>
                            <div className="grid grid-rows-4 gap-4">
                                <div>
                                    <Label htmlFor="bottom_out_force_c1">&lt; 50 gr</Label>
                                    <Input
                                        type="number"
                                        id="bottom_out_force_c1"
                                        {...register('alternativeWeights.bottom_out_force.c1', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.bottom_out_force?.c1 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.bottom_out_force.c1.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="bottom_out_force_c2">50 - 60 gr</Label>
                                    <Input
                                        type="number"
                                        id="bottom_out_force_c2"
                                        {...register('alternativeWeights.bottom_out_force.c2', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.bottom_out_force?.c2 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.bottom_out_force.c2.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="bottom_out_force_c3">60 - 70 gr</Label>
                                    <Input
                                        type="number"
                                        id="bottom_out_force_c3"
                                        {...register('alternativeWeights.bottom_out_force.c3', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.bottom_out_force?.c3 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.bottom_out_force.c3.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="bottom_out_force_c4">&gt; 70 gr</Label>
                                    <Input
                                        type="number"
                                        id="bottom_out_force_c4"
                                        {...register('alternativeWeights.bottom_out_force.c4', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.bottom_out_force?.c4 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.bottom_out_force.c4.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1>Actuation Force</h1>
                            <div className="grid grid-rows-4 gap-4">
                                <div>
                                    <Label htmlFor="actuation_travel_c1">&lt; 2 mm</Label>
                                    <Input
                                        type="number"
                                        id="actuation_travel_c1"
                                        {...register('alternativeWeights.actuation_travel.c1', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.actuation_travel?.c1 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.actuation_travel.c1.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="actuation_travel_c2">2 - 2.5 mm</Label>
                                    <Input
                                        type="number"
                                        id="actuation_travel_c2"
                                        {...register('alternativeWeights.actuation_travel.c2', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.actuation_travel?.c2 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.actuation_travel.c2.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="actuation_travel_c3">&gt; 2.5 mm</Label>
                                    <Input
                                        type="number"
                                        id="actuation_travel_c3"
                                        {...register('alternativeWeights.actuation_travel.c3', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.actuation_travel?.c3 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.actuation_travel.c3.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1>Total Travel</h1>
                            <div className="grid grid-rows-4 gap-4">
                                <div>
                                    <Label htmlFor="total_travel_c1">&lt; 3.5 mm</Label>
                                    <Input
                                        type="number"
                                        id="total_travel_c1"
                                        {...register('alternativeWeights.total_travel.c1', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.total_travel?.c1 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.total_travel.c1.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="total_travel_c2">3.5 - 4 mm</Label>
                                    <Input
                                        type="number"
                                        id="total_travel_c2"
                                        {...register('alternativeWeights.total_travel.c2', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.total_travel?.c2 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.total_travel.c2.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="total_travel_c3">&gt; 4 mm</Label>
                                    <Input
                                        type="number"
                                        id="total_travel_c3"
                                        {...register('alternativeWeights.total_travel.c3', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.total_travel?.c3 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.total_travel.c3.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1>Status Lube</h1>
                            <div className="grid grid-rows-4 gap-4">
                                <div>
                                    <Label htmlFor="lube_id_c1">Factory Lube</Label>
                                    <Input
                                        type="number"
                                        id="lube_id_c1"
                                        {...register('alternativeWeights.lube_id.c1', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.lube_id?.c1 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.lube_id.c1.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="lube_id_c2">No Factory Lube</Label>
                                    <Input
                                        type="number"
                                        id="lube_id_c2"
                                        {...register('alternativeWeights.lube_id.c2', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.lube_id?.c2 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.lube_id.c2.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1>Harga</h1>
                            <div className="grid grid-rows-4 gap-4">
                                <div>
                                    <Label htmlFor="price_c1">&lt; Rp 4000</Label>
                                    <Input
                                        type="number"
                                        id="price_c1"
                                        {...register('alternativeWeights.price.c1', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.price?.c1 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.price.c1.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="price_c2">Rp 4000 - Rp 5000</Label>
                                    <Input
                                        type="number"
                                        id="price_c2"
                                        {...register('alternativeWeights.price.c2', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.price?.c2 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.price.c2.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="price_c3">Rp 5000 - Rp 6000</Label>
                                    <Input
                                        type="number"
                                        id="price_c3"
                                        {...register('alternativeWeights.price.c3', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.price?.c3 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.price.c3.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="price_c4">&gt; Rp 7000</Label>
                                    <Input
                                        type="number"
                                        id="price_c4"
                                        {...register('alternativeWeights.price.c4', { valueAsNumber: true })}
                                        placeholder="1-10"
                                    />
                                    {errors.alternativeWeights?.price?.c4 && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternativeWeights.price.c4.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    type="submit"
                    className="my-5 w-full bg-yellow-second text-black hover:bg-yellow-second/90 md:w-28"
                >
                    Hitung
                </Button>
            </form>
        </div>
    );
};

export default Calculate;
