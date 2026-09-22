import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class UpdateCityDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @Length(2, 2)
  state?: string;

  @IsString()
  @IsOptional()
  clientWhatsappMessage?: string;

  @IsString()
  @IsOptional()
  deliveryValue?: string;

  @Transform(({ value }) => normalizeCurrencyValue(value))
  @IsNumber()
  @Min(0)
  @IsOptional()
  deliveryFeeValue?: number;

  @Transform(({ value }) => normalizeCurrencyValue(value))
  @IsNumber()
  @Min(0)
  @IsOptional()
  monthlyFeeValue?: number;

  @IsString()
  @IsOptional()
  pixKey?: string;

  @IsString()
  @IsOptional()
  adminWhatsapp?: string;

  @IsString()
  @IsOptional()
  whatsappPhoneNumberId?: string;

  @IsString()
  @IsOptional()
  whatsappCloudToken?: string;
}

function normalizeCurrencyValue(value: unknown) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const normalized = String(value).includes(',')
    ? String(value).replace(/\./g, '').replace(',', '.')
    : String(value);
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : value;
}
